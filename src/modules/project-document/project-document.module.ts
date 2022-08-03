/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { ProjectDocumentController } from './project-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDocument } from './entities/project-document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectDocument])],
  controllers: [ProjectDocumentController],
  providers: [ProjectDocumentService],
  exports: [ProjectDocumentService],
})
export class ProjectDocumentModule { }
