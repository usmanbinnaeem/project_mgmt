/* eslint-disable prettier/prettier */
import { Profile } from "../../profile/entities/profile.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('designations')
export class Designation extends BaseEntity {
    @Column()
    name: string;

    @Column()
    responsibilities: string;

    @OneToMany(() => Profile, (profile) => profile.designation)
    profiles: Profile[];
}
