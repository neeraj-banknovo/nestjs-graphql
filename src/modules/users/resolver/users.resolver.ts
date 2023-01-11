import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUsersService } from '../service/users.service';
import { MUTATIONS, QUERIES } from '../../../common/constants';
import { CreateUserSchema, UserSchema } from '../dto/users-output.dto';
import { CreateUserInput } from '../dto/users-input.dto';

@Resolver(() => UserSchema)
export class UsersResolver {
  constructor(private readonly userService: IUsersService) {}

  @Mutation(() => CreateUserSchema, {
    name: MUTATIONS.USER.CREATE_USER,
    description: 'Create user',
  })
  createCard(@Args('data') createUserInput: CreateUserInput) {
    try {
      return this.userService.createUser(createUserInput);
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }

  @Query(() => UserSchema, {
    name: QUERIES.USER.GET_USER,
    description: 'Get user by id',
  })
  getUserById(@Args('id') id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }

  @Query(() => [UserSchema], {
    name: QUERIES.USER.GET_USERS,
    description: 'Get all users',
  })
  getUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      /* handle the error
         handle the logging
       */
      throw error;
    }
  }
}
