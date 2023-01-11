import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserStatus } from '../../common/enums';
import { ICard, IUser } from '../../common/interfaces';
import { BaseEntity } from './base.entity';
import { Card } from './cards.entity';

@Entity({ name: 'users' })
@ObjectType({ isAbstract: true })
export class User extends BaseEntity implements IUser {
  @Field(() => String, { description: 'User first name' })
  @Column({ type: 'varchar', length: 60, nullable: false, name: 'first_name' })
  firstName: string;

  @Field(() => String, { description: 'User last name' })
  @Column({ type: 'varchar', length: 60, nullable: false, name: 'last_name' })
  lastName: string;

  @Field(() => String, { description: 'User email' })
  @Column({ type: 'varchar', length: 60, nullable: false })
  email: string;

  @Field(() => Number, { description: 'User age' })
  @Column({ type: 'smallint', nullable: false })
  age: number;

  @Field(() => UserStatus, { description: 'User status' })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  /* Associations */
  @OneToMany(() => Card, (card) => card.userId)
  cards: ICard[];
}
