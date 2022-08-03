/* eslint-disable prettier/prettier */
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Task } from 'src/modules/task/entities/task.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { Designation } from '../../designation/entities/designation.entity';
import { User } from '../../user/entities/user.entity';

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
    salaryPerHour: number;

    @IsIn(['Full Time', 'Part Time'])
    @IsNotEmpty()
    jobType: string;

    @IsOptional()
    user: User;

    @IsOptional()
    designation: Designation;

    @IsOptional()
    tasks: Task[];

    @IsOptional()
    team: Team;
}
