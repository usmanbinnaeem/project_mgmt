/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DesignationService } from '../designation/designation.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService, private readonly designationService: DesignationService) { }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto, userId = 38) {

    const designation = await this.designationService.create(createProfileDto.designation)
    const profile = await this.profileService.create(createProfileDto, userId, designation);
    return profile;
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
