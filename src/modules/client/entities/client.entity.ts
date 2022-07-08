/* eslint-disable prettier/prettier */
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('client')
export class Client extends BaseEntity {
    @OneToOne(() => User, (user) => user.client, {
        eager: true,
        cascade: true
    })
    contactPerson: User;

    @Column()
    contactNumber: number;

    @Column({ nullable: true })
    address: string;

}
