/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CardCategory, CardStatus } from '../../../common/enums';
import { ICard } from '../../../common/interfaces';
import { CardsRepository } from '../../../database/repositories/cards.repository';
import { DbTransactionFactory, TransactionRunner } from '../../../database/transaction.factory';
import { CreateCardInput } from '../dto/cards-input.dto';

/*  To achieve the abstraction over a provider or a class, use  abstract class instead of using Interface.
    Reason - 
    During resolving the metadata the reflection api doesn't give useful meta information to Nest Injector.
*/

/* 
    Internally reflection api will get the reflection for Interface like this-
    const metaData = Reflect.getMetadata('design:paramtypes', ICardsService);
    => metadata = [Object].

    Plain object is not useful, instead use abstract class here for abstraction since internally TS converts classes into type
    which can be used here as Type of the class.
*/
export abstract class ICardsService { 
  abstract getCardsByUserId(userId: string): Promise<ICard[]>;
  abstract getCardById(id: string): Promise<ICard>;
  abstract createCard(data: CreateCardInput): Promise<Record<string, any>>;
  abstract getActiveCount(): Promise<number>;
}

@Injectable()
export class CardsService implements ICardsService {
  constructor(
    private readonly cardRepository: CardsRepository,
    private transactionRunner: DbTransactionFactory,
  ) { }

  public async getCardsByUserId(userId: string): Promise<ICard[]> {
    try {
      return this.cardRepository.getByUserId(userId, { relations: ['user'] });
    } catch (error) {
      throw error;
    }
  }

  public async getCardById(id: string): Promise<ICard> {
    try {
      const card = await this.cardRepository.getById(id, { relations: ['user'] });
      if (!card) throw new NotFoundException('Card not found');
      return card;
    } catch (error) {
      throw error;
    }
  }

  public async createCard(data: CreateCardInput): Promise<Record<string, any>> {
    const { userId, nickName } = data;
    let transactionRunner: TransactionRunner = null;

    try {
      const cardData: Partial<ICard> = {
        userId,
        nickName,
        category: CardCategory.Virtual,
        lastFour: 1234,
        status: CardStatus.Active,
        expiry: '12/2025',
      };

      transactionRunner = await this.transactionRunner.createTransaction();
      await transactionRunner.startTransaction();
      const transactionManager = transactionRunner.transactionManager;

      const newCard = await this.cardRepository.saveWithTransaction(cardData, transactionManager);
      await transactionRunner.commitTransaction();
      return {
        ...newCard,
      };
    } catch (error) {
      if (transactionRunner) await transactionRunner.rollbackTransaction();
      throw error;
    } finally {
      if (transactionRunner) await transactionRunner.releaseTransaction();
    }
  }

  public async getActiveCount(): Promise<number> {
    return this.cardRepository.getActiveCount();
  }
}
