/* eslint-disable prettier/prettier */

import { Profile } from "../../profile/entities/profile.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Role } from "../enums";
import { Client } from "../../client/entities/client.entity";
import { BaseEntity } from "../../base.entity";
import { Status } from "../enums/status.enum";

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
    profile: Profile;

    @OneToOne(() => Client, (client) => client.contactPerson)
    client: Client;

    @Column({ type: 'enum', enum: Status, default: Status.Inactive })
    status: string;
}
