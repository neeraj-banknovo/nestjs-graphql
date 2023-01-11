import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { IUser } from '../../../common/interfaces';
import { Card } from '../../../database/entities/cards.entity';
import { User } from '../../../database/entities/users.entity';

@ObjectType({ isAbstract: true, description: 'Card schema' })
export class CardSchema extends PickType(Card, [
  'id',
  'nickName',
  'lastFour',
  'expiry',
  'category',
  'status',
  'createdAt',
] as const) {
  @Field(() => User, { description: 'User details' })
  user: IUser;
}

@ObjectType({ isAbstract: true, description: 'Create Card schema' })
export class CreateCardSchema extends PickType(CardSchema, [
  'id',
  'nickName',
  'lastFour',
  'expiry',
] as const) {}
