import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDocumentService } from './project-document.service';

describe('ProjectDocumentService', () => {
  let service: ProjectDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectDocumentService],
    }).compile();

    service = module.get<ProjectDocumentService>(ProjectDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
