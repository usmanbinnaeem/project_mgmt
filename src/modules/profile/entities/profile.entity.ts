/* eslint-disable prettier/prettier */
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Designation } from "../../designation/entities/designation.entity";
import { Task } from "../../task/entities/task.entity";
import { Team } from "../../team/entities/team.entity";
import { BaseEntity } from "../../base.entity";

@Entity('profiles')
export class Profile extends BaseEntity {
    @Column({ nullable: true })
    avatar: string;

    @Column()
    address: string;

    // @Column({type: 'tinyint', default: 0})
    @Column({ default: false })
    isRemote: boolean;

    @Column()
    totalHours: number;

    @OneToOne(() => User, (user) => user.profile)
    user: User;

    @ManyToOne(() => Designation, (designation) => designation.profiles)
    designation: Designation;

    @OneToMany(() => Task, (task) => task.asignee)
    task: Task[];

    @ManyToOne(() => Team, (team) => team.profile)
    team: Team;

}
