import { CardCategory, CardStatus } from '../enums';
import { IBaseEntity } from './base.interface';
import { IUser } from './users.interface';

export interface ICard extends IBaseEntity {
  id?: string;
  category: CardCategory;
  userId: string;
  nickName: string;
  lastFour: number;
  status: CardStatus;
  expiry: string;
  user?: IUser;
}
