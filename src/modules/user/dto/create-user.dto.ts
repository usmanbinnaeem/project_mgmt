/* eslint-disable prettier/prettier */
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateClientDto } from "../../client/dto/create-client.dto";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is Required' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    password: string;

    @IsNotEmpty()
    @IsIn(['admin', 'staff', 'client'])
    role: string;

    @IsNotEmpty()
    @IsIn(['active', 'banned', 'inactive'])
    status: string;

    @IsOptional()
    profile: CreateProfileDto;

    @IsOptional()
    client: CreateClientDto;
}
