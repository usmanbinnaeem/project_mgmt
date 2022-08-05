/* eslint-disable prettier/prettier */
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { CreateProjectCategoryDto } from "../../project-category/dto/create-project-category.dto";
import { Client } from "src/modules/client/entities/client.entity";
import { Team } from "src/modules/team/entities/team.entity";

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    duration: string;

    @IsString()
    budget: string;

    @IsOptional()
    category: CreateProjectCategoryDto;

    @IsString()
    proposal: string;

    @IsString()
    feasibility: string;

    @IsBoolean()
    isInHouse: boolean;

    @IsBoolean()
    status: boolean;

    @IsOptional()
    client: Client;

    @IsOptional()
    team: Team

}
