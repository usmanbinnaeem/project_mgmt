/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ProfileService } from '../profile/profile.service';
import { UpdateProfileDto } from '../profile/dto/update-profile.dto';
import { Team } from './entities/team.entity';
import { UpdateProjectDto } from '../project/dto/update-project.dto';
import { ProjectService } from '../project/project.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService,
    private readonly profileService: ProfileService,
    private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }

  /**
   * Add Team members
   */

  @Patch(':id/profile')
  addTeamMembers(@Param('id') id: number, @Body() profileDto: UpdateProfileDto, profileId = 1) {
    const profile = this.profileService.update(+profileId, { ...profileDto, team: { id } as Team })
    return profile;
  }

  /**
 * Assign Project to team
 */

  @Patch(':id/projects')
  assignProjectsToTeam(@Param('id') id: number, @Body() projectDto: UpdateProjectDto, projectId = 3) {
    const profile = this.projectService.update(+projectId, { ...projectDto, team: { id } as Team })
    return profile;
  }

}
