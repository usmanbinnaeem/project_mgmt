/* eslint-disable prettier/prettier */

import { Profile } from "../../profile/entities/profile.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { TaskEnum } from "../taskEnums";

@Entity('task')
export class Task extends BaseEntity {
    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Profile, (profile) => profile.tasks)
    assignee: Profile;

    @Column({ nullable: false })
    reporter: string;

    @Column({ nullable: true })
    priority: number;

    @Column({ nullable: true })
    estimatedDuration: string;

    @Column({ type: 'enum', enum: TaskEnum, default: TaskEnum.TODO })
    status: string;

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project;
}
