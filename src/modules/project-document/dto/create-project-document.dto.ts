/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateProjectDto } from "../../project/dto/create-project.dto";

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
    project: CreateProjectDto;
}
