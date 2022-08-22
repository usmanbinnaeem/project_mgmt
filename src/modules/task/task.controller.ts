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
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AbilityFactory } from '../ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Task } from './entities/task.entity';
import { Action } from '../ability/action';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly abilityFactory: AbilityFactory,
  ) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Delete, Task);
      return this.taskService.remove(+id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(
          'You are not allowed to delete this task, Only Admins are allowed',
        );
      }
    }
  }
}
