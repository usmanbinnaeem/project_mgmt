/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateProjectCategoryDto {
    @IsString()
    name: string;
}

