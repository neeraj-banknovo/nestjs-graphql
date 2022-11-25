import { InputType, Field } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IUser } from '../../../common/interfaces';

@InputType()
export class CreateUserInput implements Partial<IUser> {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @Field(() => String, { description: 'User last name' })
  lastName: string;

  @IsDefined()
  @Min(20)
  @Max(70)
  @Field(() => Number, { description: 'User age' })
  age: number;

  @IsString()
  @IsDefined()
  @IsEmail()
  @Field(() => String, { description: 'User email' })
  email: string;
}
