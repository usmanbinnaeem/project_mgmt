/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ProfileService } from '../profile/profile.service';
import { ClientService } from '../client/client.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly prepository: ProfileService, private readonly crepository: ClientService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existUser = await this.userService.findOneByEmail(email)
    if (!existUser) {
      const user = await this.userService.create(createUserDto)
      if (createUserDto.role === Role.Admin || createUserDto.role === Role.Staff) {
        await this.prepository.create(createUserDto.profile, user.id)
      }
      if (createUserDto.role === Role.Client) {
        await this.crepository.create(createUserDto.client, user.id)
      }
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
