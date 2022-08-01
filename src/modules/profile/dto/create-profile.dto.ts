/* eslint-disable prettier/prettier */
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateDesignationDto } from "src/modules/designation/dto/create-designation.dto";
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

    @IsNumber()
    sallaryPerHour: number;

    @IsIn(['admin', 'staff', 'client'])
    @IsNotEmpty()
    jobType: string;

    @IsOptional()
    user: User;

    @IsOptional()
    designation: CreateDesignationDto;

    @IsOptional()
    task: Task[];

    @IsOptional()
    team: Team;

}
