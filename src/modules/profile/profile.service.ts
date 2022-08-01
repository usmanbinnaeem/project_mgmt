/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private readonly repository: Repository<Profile>,
    @InjectRepository(User) private readonly urepository: Repository<User>
  ) { }

  async create(createProfileDto: CreateProfileDto, id: number) {
    const user = await this.urepository.findOneBy({ id })
    // console.log(":::: USER", user)
    if (user.role === Role.Admin || user.role === Role.Staff) {
      try {
        const profile = await this.repository.save({
          ...createProfileDto,
          user
        })
        return profile;
      } catch (error) {
        console.log("::::: GOT ERR", error)
      }

    } else {
      return {
        message: "No duplicates profiles allowed"
      }
    }

  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const profile = await this.repository.findOneBy({ id })
    return profile;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `Profile deleted successfully with id #${id}`;
  }
}
