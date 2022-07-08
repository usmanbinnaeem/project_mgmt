/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientService } from '../client/client.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ClientModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
