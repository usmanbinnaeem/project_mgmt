/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { Designation } from './entities/designation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Designation]), forwardRef(() => ProfileModule)],
  controllers: [DesignationController],
  providers: [DesignationService],
  exports: [TypeOrmModule, DesignationService],
})
export class DesignationModule { }
