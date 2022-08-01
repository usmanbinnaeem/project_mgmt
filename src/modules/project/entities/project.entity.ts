/* eslint-disable prettier/prettier */
import { ProjectCategory } from "../../projectCategory/entities/projectCategory.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProjectDocument } from "../../project-document/entities/project-document.entity";
import { Task } from "../../task/entities/task.entity";
import { Team } from "../../team/entities/team.entity";
import { BaseEntity } from "../../base.entity";

@Entity('project')
export class Project extends BaseEntity {
    @Column()
    title: string;

    @Column({ nullable: true })
    duration: string;

    @Column()
    budget: string;

    @ManyToOne(() => ProjectCategory, (category) => category.projects)
    category: ProjectCategory;

    @Column({ nullable: true })
    proposal: string;

    @Column({ nullable: true })
    feasibility: string;

    @Column()
    isInHouse: boolean;

    @Column({ nullable: false })
    status: boolean;

    @OneToMany(() => ProjectDocument, (document) => document.project)
    document: ProjectDocument[];

    @ManyToOne(() => Team, (team) => team.projects)
    team: Team;

    @OneToMany(() => Task, (task) => task.project)
    task: Task[];
}
