/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { checkAbilities, ReadUserAbility } from '../ability/ability.decorator';
import { AbilitiesGuards } from '../ability/ability.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
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

  @UseGuards(JwtAuthGuard, AbilitiesGuards)
  // @UseGuards(AbilitiesGuards)
  @checkAbilities(new ReadUserAbility())
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientService.findAll(['projects']);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id, ['projects']);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  /**
   * Add projects
   */

  @Get(':id/projects')
  async listProjects(@Param('id') id: number) {
    const client = await this.clientService.findOne(id, ['projects']);
    return client.projects;
  }

  @Post(':id/projects')
  async createProject(
    @Param('id') id: number,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.create({
      ...createProjectDto,
      client: { id } as Client,
    });
  }

  @Patch(':id/projects')
  async updateCLientProject(
    @Body() updateProjectDto: UpdateProjectDto,
    proId = 4,
  ) {
    return this.projectService.update(+proId, updateProjectDto);
  }
}
