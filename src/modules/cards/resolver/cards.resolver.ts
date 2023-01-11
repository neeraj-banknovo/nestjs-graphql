import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardSchema, CreateCardSchema } from '../dto/cards-output.dto';
import { ICardsService } from '../service/cards.service';
import { MUTATIONS, QUERIES } from '../../../common/constants';
import { CreateCardInput } from '../dto/cards-input.dto';

@Resolver(() => CardSchema)
export class CardsResolver {
  constructor(private readonly cardService: ICardsService) {}

  @Mutation(() => CreateCardSchema, {
    name: MUTATIONS.CARD.CREATE_CARD,
    description: 'Create card for user',
  })
  createCard(@Args('data') createCardInput: CreateCardInput) {
    try {
      return this.cardService.createCard(createCardInput);
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }

  @Query(() => CardSchema, {
    name: QUERIES.CARD.GET_CARD_BY_ID,
    description: 'Get card by id',
  })
  getCardById(@Args('id') id: string) {
    try {
      return this.cardService.getCardById(id);
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }

  @Query(() => [CardSchema], {
    name: QUERIES.CARD.GET_CARDS_BY_USER_ID,
    description: 'Get cards user id',
  })
  getCardsByUserId(@Args('userId') userId: string) {
    try {
      return this.cardService.getCardsByUserId(userId);
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }
}
