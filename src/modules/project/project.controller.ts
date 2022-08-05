/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { TaskService } from '../task/task.service';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll(['category', 'documents', 'team', 'tasks', 'client']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id, ['category', 'documents', 'team', 'tasks', 'client']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  /**
   * Create Task Inside Projects
   */

  @Get(':id/tasks')
  async tasks(@Param('id') id: number) {
    const project = await this.projectService.findOne(id, ['tasks'])
    return project.tasks;
  }

  @Post(':id/tasks')
  createTask(@Param('id') id: number, @Body() taskDto: CreateTaskDto) {
    const task = this.taskService.create({ ...taskDto, project: { id } as Project })
    return task;
  }

  @Patch(':id/tasks')
  updateTask(@Body() taskDto: UpdateTaskDto, taskId = 3) {
    return this.taskService.update(taskId, taskDto)
  }
}
