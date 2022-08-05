/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';
import { ProjectDocument } from './entities/project-document.entity';

@Injectable()
export class ProjectDocumentService {

  constructor(
    @InjectRepository(ProjectDocument) private repository: Repository<ProjectDocument>,
  ) { }

  async create(createProjectDocumentDto: CreateProjectDocumentDto) {
    return await this.repository.save(createProjectDocumentDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateProjectDocumentDto: UpdateProjectDocumentDto) {
    return await this.repository.update({ id }, updateProjectDocumentDto);
  }

  async remove(id: number) {
    await this.repository.delete(id)
    return `This action removes id #${id} projectDocument`;
  }
}
