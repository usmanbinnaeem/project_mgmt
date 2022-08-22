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
import { CheckAbilities } from '../ability/abilities.decorator';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { Action } from '../ability/action';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { UpdateProjectDto } from '../project/dto/update-project.dto';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@UseGuards(JwtAuthGuard)
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

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Client })
  @Get()
  findAll() {
    return this.clientService.findAll(['projects']);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Client })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id, ['projects']);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Client })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Client })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  /**
   * Add projects
   */

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Project })
  @Get(':id/projects')
  async listProjects(@Param('id') id: number) {
    const client = await this.clientService.findOne(id, ['projects']);
    return client.projects;
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Project })
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

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Project })
  @Patch(':id/projects')
  async updateCLientProject(
    @Body() updateProjectDto: UpdateProjectDto,
    proId = 4,
  ) {
    return this.projectService.update(+proId, updateProjectDto);
  }
}
