/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CardCategory, CardStatus } from '../../../common/enums';
import { ICard } from '../../../common/interfaces';
import { CardsRepository } from '../../../database/repositories/cards.repository';
import { DbTransactionFactory, TransactionRunner } from '../../../database/transaction.factory';
import { CreateCardInput } from '../dto/cards-input.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardRepository: CardsRepository,
    private transactionRunner: DbTransactionFactory,
  ) { }

  public async getCardsByUserId(userId: string): Promise<ICard[]> {
    try {
      return this.cardRepository.getByUserId(userId);
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
