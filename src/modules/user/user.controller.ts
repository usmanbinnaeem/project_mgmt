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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums';
import { ClientService } from '../client/client.service';
import { ProfileService } from '../profile/profile.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AbilityFactory } from '../ability/ability.factory';
import { Action } from '../ability/action';
import { User } from './entities/user.entity';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly profileService: ProfileService,
    private abilityFactory: AbilityFactory,
  ) { }

  @Post()
  async signUpUser(@Body() createUserDto: CreateUserDto) {
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

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: User })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: User })
  @Post('/new')
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.userService.findByEmail(createUserDto.email);
    if (userExist) {
      return {
        message: 'User already Exist with this email!',
      };
    }
    return await this.userService.create(createUserDto);
  }
}
