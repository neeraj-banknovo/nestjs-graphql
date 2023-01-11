import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseEntity } from '../../common/interfaces';

@ObjectType({ isAbstract: true })
export class BaseEntity implements IBaseEntity {
  @Field(() => ID, { description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => GraphQLISODateTime, { description: 'Created at timestamp' })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Field(() => String, { description: 'Updated at timestamp' })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    select: false,
  })
  deletedAt: Date;
}
