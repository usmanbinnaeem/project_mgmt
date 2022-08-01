/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), forwardRef(() => UserModule)],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule, ClientService],
})
export class ClientModule { }
