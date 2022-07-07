/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Client } from "../../client/entities/client.entity";
import { Profile } from "../../profile/entities/profile.entity";

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
    @IsString()
    role: string;

    @IsOptional()
    profile: Profile;

    @IsOptional()
    client: Client;
}
