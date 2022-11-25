import { Module } from '@nestjs/common';
import { CardsResolver } from './resolver/cards.resolver';
import { CardsService } from './service/cards.service';

@Module({
  imports: [],
  providers: [CardsResolver, CardsService],
  exports: [CardsService],
})
export class CardsModule {}
