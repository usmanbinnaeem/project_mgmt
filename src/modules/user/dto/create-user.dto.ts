/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateProfileDto } from '../../profile/dto/create-profile.dto';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsIn(['admin', 'staff', 'client'])
    role: string;

    @IsOptional()
    @IsIn(['active', 'banned', 'inactive'])
    status: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateProfileDto)
    profile: CreateProfileDto; // profileId

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateClientDto)
    client: CreateClientDto;
}
