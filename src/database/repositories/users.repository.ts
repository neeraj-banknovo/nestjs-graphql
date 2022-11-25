import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatus } from '../../common/enums';
import { IUser } from '../../common/interfaces';
import { User } from '../entities/users.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  getAllActiveUsers(): Promise<IUser[]> {
    return this.repository.find({ where: { status: UserStatus.Active } });
  }
}
