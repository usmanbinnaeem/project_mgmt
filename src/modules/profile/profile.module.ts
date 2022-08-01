/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DesignationModule } from '../designation/designation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), forwardRef(() => UserModule), DesignationModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [TypeOrmModule, ProfileService],
})
export class ProfileModule { }
