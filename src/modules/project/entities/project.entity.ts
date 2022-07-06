/* eslint-disable prettier/prettier */
import { ProjectCategory } from "../../project-category/entities/project-category.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProjectDocument } from "../../project-document/entities/project-document.entity";
import { Task } from "../../task/entities/task.entity";
import { Team } from "../../team/entities/team.entity";
import { BaseEntity } from "../../base.entity";

@Entity('project')
export class Project extends BaseEntity {
    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    duration: string;

    @Column()
    budget: string;

    @ManyToOne(() => ProjectCategory, (category) => category.project)
    category: ProjectCategory;

    @Column({ nullable: true })
    proposal: string;

    @Column({ nullable: true })
    feasibility: string;

    @Column()
    isInHouse: string;

    @Column({ nullable: false })
    status: boolean;

    @OneToMany(() => ProjectDocument, (document) => document.project)
    document: ProjectDocument[];

    @ManyToOne(() => Team, (team) => team.project)
    team: Team;

    @OneToMany(() => Task, (task) => task.project)
    task: Task[];
}
