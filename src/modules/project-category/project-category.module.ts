/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';
import { ProjectCategoryController } from './project-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from './entities/project-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCategory])],
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService],
  exports: [ProjectCategoryService],
})
export class ProjectCategoryModule { }
