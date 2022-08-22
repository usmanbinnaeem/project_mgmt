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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { TaskService } from '../task/task.service';
import { AbilityFactory } from '../ability/ability.factory';
import { Action } from '../ability/action';
import { Task } from '../task/entities/task.entity';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { CheckAbilities } from '../ability/abilities.decorator';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { Profile } from './entities/profile.entity';

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly taskService: TaskService,
    private readonly abilityFactory: AbilityFactory,
  ) { }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Profile })
  @Get()
  findAll() {
    return this.profileService.findAll(['designation', 'tasks', 'team']);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Profile })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id, ['designation', 'tasks', 'team']);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Profile })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Profile })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }

  /**
   * Update tasks
   *
   */

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Task })
  @Patch(':id/tasks')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    taskId = 5,
  ) {
    const task = await this.taskService.findOne(taskId, ['assignee']);
    if (task.assignee.id === id) {
      return await this.taskService.update(taskId, updateTaskDto);
    } else {
      return {
        message: 'You are not authorized to update this task',
      };
    }
  }

  /**
   * Read profile tasks
   */

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Task })
  @Get(':id/tasks')
  async readTask(@Param('id') id: number) {
    const profile = await this.profileService.findOne(id, ['tasks']);
    return profile.tasks;
  }

  /**
   * Create Tasks for profile
   */

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Task })
  @Post(':id/tasks')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  /**
   * Delete Task from profile
   */

  @Delete(':id/tasks')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Task })
  async deleteTask(taskId = 5) {
    return await this.taskService.remove(taskId);
  }
}
