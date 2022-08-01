/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProfileModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule, TaskService],
})
export class TaskModule { }
