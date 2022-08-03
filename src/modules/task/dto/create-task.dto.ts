/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";
import { CreateProjectDto } from "../../project/dto/create-project.dto";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    assignee: CreateProfileDto;

    @IsString()
    reporter: string;

    @IsNumber()
    @IsOptional()
    priority: number;

    @IsString()
    estimatedDuration: string;

    @IsBoolean()
    status: boolean;

    @IsOptional()
    project: CreateProjectDto;
}
