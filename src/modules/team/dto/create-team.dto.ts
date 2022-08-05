/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    name: string;
}
