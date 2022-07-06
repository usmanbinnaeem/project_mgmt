/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DesignationModule } from './modules/designation/designation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './modules/task/task.module';
import { ProjectModule } from './modules/project/project.module';
import { ClientModule } from './modules/client/client.module';
import { TeamModule } from './modules/team/team.module';
import { ProjectCategoryModule } from './modules/project-category/project-category.module';
import { ProjectDocumentModule } from './modules/project-document/project-document.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'test',
    database: 'project_mgmt',
    autoLoadEntities: true,
    logging: false,
  }),
    UserModule, ProfileModule, DesignationModule, TaskModule, ProjectModule, ClientModule, ProjectCategoryModule, ProjectDocumentModule, TeamModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
