import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../../common/enums';
import { IUser } from '../../common/interfaces';
import { BaseEntity } from './base.entity';
import { Card } from './cards.entity';

@Entity({ name: 'users' })
@ObjectType({ isAbstract: true })
export class User extends BaseEntity implements IUser {
  @Field(() => ID, { description: 'User Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Field(() => String, { description: 'User status' })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  /* Associations */
  @OneToMany(() => Card, (card) => card.userId)
  cards: Card[];
}
