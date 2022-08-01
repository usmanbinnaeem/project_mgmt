/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDocumentModule } from '../project-document/project-document.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProjectDocumentModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule, ProjectService],
})
export class ProjectModule { }
