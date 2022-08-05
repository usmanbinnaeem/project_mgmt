/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectDocumentModule } from '../project-document/project-document.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProjectDocumentModule, TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule { }
