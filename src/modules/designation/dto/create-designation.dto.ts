/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";

export class CreateDesignationDto {
    @IsString()
    name: string;

    @IsOptional()
    profile: CreateProfileDto;

    @IsString()
    responsibilities: string;


}
