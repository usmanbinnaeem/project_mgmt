/* eslint-disable prettier/prettier */
import { Designation } from '../../designation/entities/designation.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Task } from '../../task/entities/task.entity';
import { Team } from '../../team/entities/team.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
    @Column({ nullable: true })
    avatar: string;

    @Column()
    address: string;

    @Column({ default: false })
    isRemote: boolean;

    @Column()
    totalHours: number;

    @Column({ nullable: true, default: 10 })
    salaryPerHour: number;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Designation, (designation) => designation.profiles)
    designation: Designation;

    @OneToMany(() => Task, (task) => task.assignee)
    tasks: Task[];

    @ManyToOne(() => Team, (team) => team.profiles)
    team: Team;
}
