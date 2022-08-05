/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Project } from "src/modules/project/entities/project.entity";

export class CreateProjectDocumentDto {
    @IsString()
    name: string;

    @IsNumber()
    version: number;

    @IsString()
    author: string;

    @IsString()
    type: string;

    @IsOptional()
    project: Project;
}
