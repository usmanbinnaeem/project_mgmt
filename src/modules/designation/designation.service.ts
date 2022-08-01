/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from './entities/designation.entity';

@Injectable()

export class DesignationService {
  constructor(
    @InjectRepository(Designation) private readonly repository: Repository<Designation>,
  ) { }

  async create(createDesignationDto: CreateDesignationDto) {
    const desigination = await this.repository.save(createDesignationDto);
    return desigination;
  }

  findAll() {
    return `This action returns all designation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} designation`;
  }

  update(id: number, updateDesignationDto: UpdateDesignationDto) {
    return `This action updates a #${id} designation`;
  }

  remove(id: number) {
    return `This action removes a #${id} designation`;
  }
}
