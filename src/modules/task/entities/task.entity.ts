/* eslint-disable prettier/prettier */
import { Profile } from "../../profile/entities/profile.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('task')
export class Task extends BaseEntity {
    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Profile, (profile) => profile.task)
    asignee: Profile;

    @Column({ nullable: false })
    reporter: string;

    @Column({ nullable: true })
    priority: number;

    @Column({ nullable: true })
    estimatedDuration: string;

    @Column({ default: false })
    status: boolean;

    @ManyToOne(() => Project, (project) => project.task)
    project: Project;
}
