import { InputType, Field } from '@nestjs/graphql';
import {
  IsUUID,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICard } from '../../../common/interfaces';

@InputType()
export class CreateCardInput implements Partial<ICard> {
  @IsUUID()
  @IsDefined()
  @Field(() => String, { description: 'User id for the card' })
  userId: string;

  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(20)
  @Field(() => String, { description: 'Nick name for the card' })
  nickName: string;
}
