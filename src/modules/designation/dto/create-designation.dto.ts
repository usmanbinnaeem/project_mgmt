/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDesignationDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    responsibilities: string;
}