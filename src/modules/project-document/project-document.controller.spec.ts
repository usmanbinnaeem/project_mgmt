import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDocumentController } from './project-document.controller';
import { ProjectDocumentService } from './project-document.service';

describe('ProjectDocumentController', () => {
  let controller: ProjectDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDocumentController],
      providers: [ProjectDocumentService],
    }).compile();

    controller = module.get<ProjectDocumentController>(ProjectDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
