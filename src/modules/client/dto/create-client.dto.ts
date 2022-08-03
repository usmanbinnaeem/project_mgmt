/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateClientDto {
    @IsOptional()
    contactPerson: string;

    @IsOptional()
    @IsEmail()
    contactEmail: string;

    @IsOptional()
    contactNumber: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    user: User;
}
