/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator"
import { CreateProjectDto } from "../../project/dto/create-project.dto";

export class CreateProjectCategoryDto {
    @IsString()
    name: string;

    @IsOptional()
    projects: CreateProjectDto;
}
