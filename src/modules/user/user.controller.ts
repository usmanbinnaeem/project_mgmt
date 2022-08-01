/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ProfileService } from '../profile/profile.service';
import { ClientService } from '../client/client.service';
import { DesignationService } from '../designation/designation.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly desiginationService: DesignationService, private readonly profileService: ProfileService, private readonly clientService: ClientService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existUser = await this.userService.findOneByEmail(email)
    if (!existUser) {
      const user = await this.userService.create(createUserDto)
      const desigination = await this.desiginationService.create(createUserDto.profile.designation)
      if (createUserDto.role === Role.Admin || createUserDto.role === Role.Staff) {
        await this.profileService.create(createUserDto.profile, user.id, desigination)
      }
      if (createUserDto.role === Role.Client) {
        await this.clientService.create(createUserDto.client, user.id)
      }
      return user
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
