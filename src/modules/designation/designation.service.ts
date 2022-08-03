/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Designation } from './entities/designation.entity';

@Injectable()
export class DesignationService {

  constructor(
    @InjectRepository(Designation) private repository: Repository<Designation>,
  ) { }

  create(createDesignationDto: CreateDesignationDto) {
    return this.repository.save(createDesignationDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateDesignationDto: UpdateDesignationDto) {
    return this.repository.update({ id }, updateDesignationDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
