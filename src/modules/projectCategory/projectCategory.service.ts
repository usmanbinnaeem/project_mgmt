/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectCategoryDto } from './dto/create-projectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/update-projectCategory.dto';
import { ProjectCategory } from './entities/projectCategory.entity';

@Injectable()
export class ProjectCategoryService {
  constructor(
    @InjectRepository(ProjectCategory) private readonly repository: Repository<ProjectCategory>,
  ) { }

  async create(createProjectCategoryDto: CreateProjectCategoryDto) {
    return await this.repository.save(createProjectCategoryDto)
  }

  findAll() {
    return `This action returns all projectCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectCategory`;
  }

  update(id: number, updateProjectCategoryDto: UpdateProjectCategoryDto) {
    return `This action updates a #${id} projectCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCategory`;
  }
}
