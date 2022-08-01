/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientModule } from '../client/client.module';
import { ProfileModule } from '../profile/profile.module';
import { DesignationModule } from '../designation/designation.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ClientModule, ProfileModule, DesignationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
