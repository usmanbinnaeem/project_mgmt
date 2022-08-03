/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ClientService } from '../client/client.service';
import { ProfileService } from '../profile/profile.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly clientService: ClientService,
    private readonly profileService: ProfileService,) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.userService.findByEmail(createUserDto.email);

    if (userExist) {
      throw new BadRequestException('User already exists with provided email');
    }

    const user = await this.userService.create(createUserDto);

    if (createUserDto.role === Role.Client) {

      const client = await this.clientService.create({
        ...createUserDto.client,
        user,
      });

      return {
        ...user,
        client,
        profile: null,
      };
    } else {
      const profile = await this.profileService.create({
        ...createUserDto.profile,
        user,
      });

      return {
        ...user,
        profile,
        client: null,
      };
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
