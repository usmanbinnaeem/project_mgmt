/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCategoryController } from './projectCategory.controller';
import { ProjectCategoryService } from './projectCategory.service';

describe('ProjectCategoryController', () => {
  let controller: ProjectCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCategoryController],
      providers: [ProjectCategoryService],
    }).compile();

    controller = module.get<ProjectCategoryController>(ProjectCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
