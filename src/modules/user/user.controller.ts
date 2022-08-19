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
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ClientService } from '../client/client.service';
import { ProfileService } from '../profile/profile.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AbilityFactory } from '../ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from '../ability/action';
import { Client } from '../client/entities/client.entity';
import { Profile } from '../profile/entities/profile.entity';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly profileService: ProfileService,
    private abilityFactory: AbilityFactory,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const userExist = await this.userService.findByEmail(createUserDto.email);

    const reqUser = req;
    console.log('-----> reqUser', reqUser);

    const ability = this.abilityFactory.defineAbility(reqUser);
    console.log('-----> check ability', ability.can(Action.Create, User));

    // if (userExist) {
    //   throw new BadRequestException('User already exists with provided email');
    // }

    // const reqUser = req.user;
    // console.log('-----> reqUser', req.user);

    // const ability = this.abilityFactory.defineAbility(reqUser);
    // console.log('-----> check ability', ability.can(Action.Create, User));

    // const isAllowed = ability.can(Action.Create, User);
    // if (!isAllowed) {
    //   throw new ForbiddenException('You are not allowed to create a user');
    // }

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException('You are not allowed to create a user');
      }
    }



    // if (createUserDto.role === Role.Client) {
    //   const ability = this.abilityFactory.defineAbility(reqUser);

    //   try {
    //     ForbiddenError.from(ability)
    //       .setMessage('You can not create a client')
    //       .throwUnlessCan(Action.Create, Client);
    //     const client = await this.clientService.create({
    //       ...createUserDto.client,
    //       user,
    //     });

    //     return {
    //       ...user,
    //       client,
    //       profile: null,
    //     };
    //   } catch (error) {
    //     if (error instanceof ForbiddenError) {
    //       throw new ForbiddenException(error.message);
    //     }
    //   }
    // } else {
    //   const ability = this.abilityFactory.defineAbility(reqUser);
    //   try {
    //     ForbiddenError.from(ability)
    //       .setMessage('You can not create a profile')
    //       .throwUnlessCan(Action.Create, Profile);
    //     const profile = await this.profileService.create({
    //       ...createUserDto.profile,
    //       user,
    //     });

    //     return {
    //       ...user,
    //       profile,
    //       client: null,
    //     };
    //   } catch (error) {
    //     if (error instanceof ForbiddenError) {
    //       throw new ForbiddenException(error.message);
    //     }
    //   }
    // }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('-----> reqUser', req);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
