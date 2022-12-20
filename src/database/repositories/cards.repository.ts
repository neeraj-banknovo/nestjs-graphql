/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindManyOptions, Repository } from 'typeorm';
import { CardStatus } from '../../common/enums';
import { ICard } from '../../common/interfaces';
import { Card } from '../entities/cards.entity';
import { BaseRepository, defaultScope } from './base.repository';
import { findAllOptions } from '../../common/interfaces/repository.interface';

@Injectable()
export class CardsRepository extends BaseRepository<Card> {
  constructor(
    @InjectRepository(Card) private readonly repository: Repository<Card>,
  ) {
    super(repository);
  }

  getAllActiveCards(): Promise<ICard[]> {
    return this.repository.find({ where: { status: CardStatus.Active } });
  }

  async getByUserId(userId: string, findOptions: findAllOptions<Card> = {}): Promise<ICard[]> {
    const { select = [], relations = [], skip = null, take = null } = findOptions;
    const options: FindManyOptions = {
      where: { userId },
      ...(select.length && { select }),
      ...(relations.length && { relations }),
      ...(skip && { skip }),
      ...(take && { take }),
      ...defaultScope,
    };
    return this.repository.find(options);
  }

  async saveWithTransaction(data: DeepPartial<Card>, transactionManager: EntityManager): Promise<Card> {
    return transactionManager.save(Card, data);
  }
}
