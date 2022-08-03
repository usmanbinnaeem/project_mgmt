/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()

export class TeamService {

  constructor(
    @InjectRepository(Team) private repository: Repository<Team>,
  ) { }

  async create(createTeamDto: CreateTeamDto) {
    return await this.repository.save(createTeamDto)
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id }
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.repository.update({ id }, updateTeamDto);
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `Team with id #${id} deleted successfully`;
  }
}
