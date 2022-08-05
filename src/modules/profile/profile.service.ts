/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private repository: Repository<Profile>,
  ) { }

  create(createProfileDto: CreateProfileDto) {
    return this.repository.save(createProfileDto);
  }

  findAll(relations = []) {
    return this.repository.find({
      relations
    });
  }

  findOne(id: number, relations = []) {
    return this.repository.findOne({
      where: { id },
      relations
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.repository.update({ id }, updateProfileDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
