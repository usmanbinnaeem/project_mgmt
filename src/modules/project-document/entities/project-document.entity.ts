/* eslint-disable prettier/prettier */
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('projectDocument')
export class ProjectDocument extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column()
    version: number;

    @Column()
    author: string;

    @Column()
    type: string;

    @ManyToOne(() => Project, (project) => project.documents)
    project: Project;
}
