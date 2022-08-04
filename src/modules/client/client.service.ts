/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
  ) { }

  create(createClientDto: CreateClientDto) {
    return this.repository.save(createClientDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number, relations = []) {
    return this.repository.findOne({ where: { id }, relations });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.repository.update({ id }, updateClientDto);
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `This action removes a #${id} client`;
  }
}
