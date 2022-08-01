/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";
import { CreateProjectDto } from "../../project/dto/create-project.dto";

export class CreateTeamDto {
    @IsString()
    name: string;

    @IsOptional()
    project: CreateProjectDto;

    @IsOptional()
    profile: CreateProfileDto;
}
