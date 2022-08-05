/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';
import { Project } from '../project/entities/project.entity';

@Controller('project-document')
export class ProjectDocumentController {
  constructor(
    private readonly projectDocumentService: ProjectDocumentService,
  ) { }

  @Post()
  create(@Body() createProjectDocumentDto: CreateProjectDocumentDto, id = 2) {
    return this.projectDocumentService.create({ ...createProjectDocumentDto, project: { id } as Project });
  }

  @Get()
  findAll() {
    return this.projectDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDocumentDto: UpdateProjectDocumentDto,
  ) {
    return this.projectDocumentService.update(+id, updateProjectDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectDocumentService.remove(+id);
  }
}
