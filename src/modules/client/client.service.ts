/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly repository: Repository<Client>) { }

  async create(createClientDto: CreateClientDto, user: User) {
    const contactEmail = createClientDto.contactEmail;
    const existClient = await this.repository.findOneBy({ contactEmail })
    if (!existClient) {
      const client = this.repository.save({
        ...createClientDto,
        contactPerson: user
      });
      return client;
    } else {
      return {
        message: 'client already Exists'
      }
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const client = await this.repository.findOneBy({ id })
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return {
      message: `user with id# ${id} has been deleted successfully`
    }
  }
}
