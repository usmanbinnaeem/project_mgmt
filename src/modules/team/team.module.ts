/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { ProfileModule } from '../profile/profile.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), ProfileModule, ProjectModule],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule { }
