/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserEmailDto {

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    contactEmail: string;

}
