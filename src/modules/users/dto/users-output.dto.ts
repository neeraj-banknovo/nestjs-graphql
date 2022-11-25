import { ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../../../database/entities/users.entity';

@ObjectType({ isAbstract: true, description: 'User schema' })
export class UserSchema extends PickType(User, [
  'id',
  'firstName',
  'lastName',
  'age',
  'email',
  'status',
  'createdAt',
] as const) {}

@ObjectType({ isAbstract: true, description: 'Create user schema' })
export class CreateUserSchema extends PickType(UserSchema, [
  'id',
  'firstName',
  'lastName',
  'status',
] as const) {}
