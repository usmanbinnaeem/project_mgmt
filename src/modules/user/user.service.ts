/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.repository.save(createUserDto);
  }

  findAll() {
    return this.repository.find({ relations: ['profile', 'profile.designation', 'client'] });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['profile', 'profile.designation', 'client'],
    });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
