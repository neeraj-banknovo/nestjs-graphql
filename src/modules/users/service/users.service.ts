import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatus } from '../../../common/enums';
import { IUser } from '../../../common/interfaces';
import { UsersRepository } from '../../../database/repositories/users.repository';
import { CreateUserInput } from '../dto/users-input.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async getAllUsers(): Promise<IUser[]> {
    try {
      return this.userRepository.getAllActiveUsers();
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: string): Promise<IUser> {
    try {
      const card = await this.userRepository.getById(id);
      if (!card) throw new NotFoundException('User not found');
      return card;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(data: CreateUserInput): Promise<Record<string, any>> {
    const { firstName, lastName, email, age } = data;
    try {
      const userData: Partial<IUser> = {
        firstName,
        lastName,
        email,
        age,
        status: UserStatus.Active,
      };

      const newUser = await this.userRepository.save(userData);
      return {
        ...newUser,
      };
    } catch (error) {
      throw error;
    }
  }
}
