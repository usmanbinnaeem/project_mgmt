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
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { UpdateProjectDto } from '../project/dto/update-project.dto';
import { ProjectService } from '../project/project.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly projectService: ProjectService,
  ) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  /**
   * Add projects
   */

  @Get(':id/projects')
  async listProjects(@Param('id') id: number) {
    const client = await this.clientService.findOne(id, ['projects'])
    return client.projects;
  }

  @Post(':id/projects')
  async createProject(@Param('id') id: number, @Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create({
      ...createProjectDto,
      client: { id } as Client
    })
  }

  @Patch(':id/projects')
  async updateCLientProject(@Body() updateProjectDto: UpdateProjectDto, proId = 4) {
    return this.projectService.update(+proId, updateProjectDto);
  }
}
