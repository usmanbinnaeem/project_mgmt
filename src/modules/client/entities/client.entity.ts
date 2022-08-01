/* eslint-disable prettier/prettier */
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('client')
export class Client extends BaseEntity {
    @Column({ default: "John Doe", nullable: true })
    contactPerson: string;

    @Column({ nullable: true })
    contactEmail: string;

    @Column({ nullable: true })
    contactNumber: string;

    @Column({ nullable: true })
    address: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User

}
