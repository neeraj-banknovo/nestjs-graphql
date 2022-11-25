import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../service/users.service';
import { MUTATIONS, QUERIES } from '../../../common/constants';
import { CreateUserSchema, UserSchema } from '../dto/users-output.dto';
import { CreateUserInput } from '../dto/users-input.dto';

@Resolver(() => UserSchema)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => CreateUserSchema, {
    name: MUTATIONS.USER.CREATE_USER,
    description: 'Create user',
  })
  createCard(@Args('data') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => UserSchema, {
    name: QUERIES.USER.GET_USER,
    description: 'Get user by id',
  })
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => [UserSchema], {
    name: QUERIES.USER.GET_USERS,
    description: 'Get all users',
  })
  getUsers() {
    return this.userService.getAllUsers();
  }
}
