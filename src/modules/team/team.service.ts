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
    @InjectRepository(Team) private readonly repository: Repository<Team>,
  ) { }

  create(createTeamDto: CreateTeamDto) {
    return this.repository.save(createTeamDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    const team = this.repository.findOneBy({ id })
    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async remove(id: number) {
    const deleted = await this.repository.delete(id)
    return `Team with id# ${id} deleted successfully`
  }

  addProfile(id, profile) {
    this.repository.update({ id }, profile)
  }
}
