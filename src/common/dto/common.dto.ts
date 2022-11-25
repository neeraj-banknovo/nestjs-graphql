import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID, IsDefined } from 'class-validator';

export class GetByIdArgs {
  @IsUUID()
  @IsDefined()
  @Field(() => String, { description: 'Id' })
  id: string;
}

@ArgsType()
export class GetByUserIdArgs {
  @IsUUID()
  @IsDefined()
  userId: string;
}
