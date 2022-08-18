/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ClientService } from '../client/client.service';
import { ProfileService } from '../profile/profile.service';
import { AbilityFactory } from '../ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from '../ability/action.enum';
import { Client } from '../client/entities/client.entity';
import { Profile } from '../profile/entities/profile.entity';
import { checkAbilities, DeleteUserAbility, ReadProfileAbility, ReadUserAbility } from '../ability/ability.decorator';
import { AbilitiesGuards } from '../ability/ability.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly profileService: ProfileService,
    private abilityFactory: AbilityFactory,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.userService.findByEmail(createUserDto.email);

    if (userExist) {
      throw new BadRequestException('User already exists with provided email');
    }

    const user = await this.userService.create(createUserDto);

    if (createUserDto.role === Role.Client) {
      // const ability = this.abilityFactory.defineAbility(user);
      try {
        // ForbiddenError.from(ability).throwUnlessCan(Action.create, Client);
        const client = await this.clientService.create({
          ...createUserDto.client,
          user,
        });

        return {
          ...user,
          client,
          profile: null,
        };
      } catch (error) {
        // if (error instanceof ForbiddenError) {
        //   throw new ForbiddenException(error.message);
        // }
      }

    } else {
      // const ability = this.abilityFactory.defineAbility(user);
      try {
        // ForbiddenError.from(ability).throwUnlessCan(Action.create, Profile);
        const profile = await this.profileService.create({
          ...createUserDto.profile,
          user,
        });

        return {
          ...user,
          profile,
          client: null,
        };
      } catch (error) {
        // if (error instanceof ForbiddenError) {
        //   throw new ForbiddenException(error.message);
        // }
      }

    }
  }

  @UseGuards(AbilitiesGuards)
  @checkAbilities(new ReadUserAbility())
  @checkAbilities(new ReadProfileAbility())
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @checkAbilities(new ReadUserAbility())
  @checkAbilities(new ReadProfileAbility())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @checkAbilities(new DeleteUserAbility())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
