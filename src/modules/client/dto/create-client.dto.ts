/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

export class CreateClientDto {

    @IsNotEmpty()
    contactPerson: User;

    @IsNotEmpty()
    contactNumber: number;

    @IsNotEmpty({ message: 'Enail is required' })
    @IsEmail()
    contactEmail: string;

    @IsOptional()
    address: string;

}
