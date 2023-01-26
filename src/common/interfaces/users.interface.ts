import { UserStatus } from '../enums';
import { IBaseEntity } from './base.interface';
import { ICard } from './cards.interface';

export interface IUser extends IBaseEntity {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: UserStatus;
  cards?: ICard[];
}
