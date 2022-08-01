/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Designation } from "../../designation/entities/designation.entity";
import { Task } from "../../task/entities/task.entity";
import { Team } from "../../team/entities/team.entity";
import { User } from "../../user/entities/user.entity";

export class CreateProfileDto {
    @IsOptional()
    avatar: string;

    @IsNotEmpty()
    address: string;

    @IsBoolean()
    isRemote: boolean;

    @IsNumber()
    totalHours: number;

    @IsOptional()
    user: User;

    @IsOptional()
    designation: Designation;

    @IsOptional()
    task: Task[];

    @IsOptional()
    team: Team;

}
