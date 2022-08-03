/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { DesignationModule } from '../designation/designation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), DesignationModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
