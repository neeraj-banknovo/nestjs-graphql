import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardStatus } from '../../common/enums';
import { ICard } from '../../common/interfaces';
import { Card } from '../entities/cards.entity';
import { BaseRepository } from './base.repository';

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
}
