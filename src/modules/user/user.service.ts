/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existUser = await this.repository.findOneBy({ email })
    if (!existUser) {
      const user = await this.repository.save(createUserDto)
      return user
    } else {
      throw new BadRequestException("User already exists with this email")
    }
  }

  findAll() {
    return this.repository.find({ relations: ['profiles', 'clients'] });
  }

  findOne(id: number) {
    const user = this.repository.findOne({
      where: { id },
      relations: ['profiles', 'clients']
    })
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOneBy({ email })
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
