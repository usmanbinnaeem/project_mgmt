/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { Client } from '../client/entities/client.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(Client) private readonly crepository: Repository<Client>

  ) { }
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existUser = await this.repository.findOneBy({ email })
    if (!existUser) {
      const user = await this.repository.save(createUserDto)
      this.crepository.save(createUserDto.client)
      return user;
    } else {
      return "User already exists with this email"
    }
  }

  findAll() {
    return this.repository.find({
      relations: ['client']
    });
  }

  findOne(id: number) {
    const user = this.repository.findOneBy({ id })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return {
      message: `User deleted Successfully with id# ${id}`
    }
  }
}
