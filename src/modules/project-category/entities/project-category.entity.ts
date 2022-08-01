/* eslint-disable prettier/prettier */
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('projectCategory')
export class ProjectCategory extends BaseEntity {
    @Column({ nullable: false })
    name: string

    @OneToMany(() => Project, (project) => project.category)
    project: Project[]
}
