/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../base.entity";
import { Profile } from "../../profile/entities/profile.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('team')
export class Team extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Profile, (profile) => profile.team)
    profiles: Profile[];

    @OneToMany(() => Project, (project) => project.team)
    projects: Project[];
}
