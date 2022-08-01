/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectCategoryService } from './projectCategory.service';
import { CreateProjectCategoryDto } from './dto/create-projectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/update-projectCategory.dto';

@Controller('projectcategory')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) { }

  @Post()
  create(@Body() createProjectCategoryDto: CreateProjectCategoryDto) {
    return this.projectCategoryService.create(createProjectCategoryDto);
  }

  @Get()
  findAll() {
    return this.projectCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectCategoryDto: UpdateProjectCategoryDto) {
    return this.projectCategoryService.update(+id, updateProjectCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCategoryService.remove(+id);
  }
}
