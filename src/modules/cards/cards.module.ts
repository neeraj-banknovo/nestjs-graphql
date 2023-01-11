import { Module, Provider } from '@nestjs/common';
import { CardsResolver } from './resolver/cards.resolver';
import { CardsService, ICardsService } from './service/cards.service';

const providers: Provider[] = [
  {
    provide: ICardsService,
    useClass: CardsService,
  },
];

@Module({
  imports: [],
  providers: [CardsResolver, ...providers],
  exports: [],
})
export class CardsModule {}
