import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CardCategory, CardStatus } from '../../common/enums';
import { ICard, IUser } from '../../common/interfaces';
import { BaseEntity } from './base.entity';
import { User } from './users.entity';

@Entity({ name: 'cards' })
@ObjectType({ isAbstract: true })
export class Card extends BaseEntity implements ICard {
  @Field(() => CardCategory, { description: 'Category of the card' })
  @Column({
    type: 'enum',
    enum: CardCategory,
    default: CardCategory.Virtual,
  })
  category: CardCategory;

  @Field(() => String, { description: 'UserId of the card' })
  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId: string;

  @Field(() => String, { description: 'Nick name on the card' })
  @Column({ type: 'varchar', nullable: false, name: 'nick_name' })
  nickName: string;

  @Field(() => Number, { description: 'Last four digits of the card' })
  @Column({ type: 'smallint', nullable: false, name: 'last_four' })
  lastFour: number;

  @Field(() => CardStatus, { description: 'Status of the card' })
  @Column({
    type: 'enum',
    enum: CardStatus,
    default: CardStatus.Active,
  })
  status: CardStatus;

  @Field(() => String, { description: 'Expiry of the card' })
  @Column({ type: 'varchar', nullable: false })
  expiry: string;

  /* Associations */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: IUser;
}
