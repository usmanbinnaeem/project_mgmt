/* eslint-disable prettier/prettier */

import { Profile } from "../../profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Role } from "../enums";
import { Client } from "../../client/entities/client.entity";
import { BaseEntity } from "../../base.entity";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.Staff })
    role: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToOne(() => Client, (client) => client.contactPerson)
    @JoinColumn()
    client: Client;
}
