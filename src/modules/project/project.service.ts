/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project) private repository: Repository<Project>,
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    return await this.repository.save(createProjectDto);
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

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.repository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `Project with id #${id} deleted successfully`;
  }
}
