/* eslint-disable prettier/prettier */
import { Project } from "../../project/entities/project.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('projectDocument')
export class ProjectDocument extends BaseEntity {
    @Column()
    name: string;

    @Column()
    version: number;

    @Column()
    author: string;

    @Column()
    type: string;

    @ManyToOne(() => Project, (project) => project.document)
    project: Project
}
