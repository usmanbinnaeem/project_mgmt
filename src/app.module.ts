/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { DesignationModule } from './modules/designation/designation.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectCategoryModule } from './modules/project-category/project-category.module';
import { ProjectDocumentModule } from './modules/project-document/project-document.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'test',
    database: 'test',
    autoLoadEntities: true,
  }), UserModule, ProfileModule, ClientModule, DesignationModule, ProjectModule, ProjectCategoryModule, ProjectDocumentModule, TaskModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
