/* eslint-disable prettier/prettier */
import { Profile } from "../../profile/entities/profile.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('team')
export class Team extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Profile, (profile) => profile.team)
    profiles: Profile[];

    @OneToMany(() => Project, (project) => project.team)
    projects: Project[];
}
