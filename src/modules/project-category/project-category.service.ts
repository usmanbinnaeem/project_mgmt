/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';
import { ProjectCategory } from './entities/project-category.entity';

@Injectable()
export class ProjectCategoryService {

  constructor(
    @InjectRepository(ProjectCategory) private repository: Repository<ProjectCategory>,
  ) { }

  async create(createProjectCategoryDto: CreateProjectCategoryDto) {
    return await this.repository.save(createProjectCategoryDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(
      { where: { id } }
    );
  }

  update(id: number, updateProjectCategoryDto: UpdateProjectCategoryDto) {
    return this.repository.update({ id }, updateProjectCategoryDto);
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `Project Category with id #${id} removed successfully`;
  }
}
