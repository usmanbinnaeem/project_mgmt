/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectCategoryService } from './projectCategory.service';
import { ProjectCategoryController } from './projectCategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from './entities/projectCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCategory])],
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService],
  exports: [TypeOrmModule, ProjectCategoryService],
})
export class ProjectCategoryModule { }
