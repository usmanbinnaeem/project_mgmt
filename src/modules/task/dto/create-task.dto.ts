/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { CreateProjectDto } from "../../project/dto/create-project.dto";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    assignee: Profile;

    @IsString()
    reporter: string;

    @IsNumber()
    @IsOptional()
    priority: number;

    @IsString()
    estimatedDuration: string;

    @IsNotEmpty()
    @IsIn(['todo', 'in progress', 'done'])
    status: string;

    @IsOptional()
    project: CreateProjectDto;
}
