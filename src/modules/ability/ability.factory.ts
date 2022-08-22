/* eslint-disable prettier/prettier */
import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Client } from '../client/entities/client.entity';
import { Designation } from '../designation/entities/designation.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../task/entities/task.entity';
import { Team } from '../team/entities/team.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums';
import { Action } from './action';

export type Subjects =
    | InferSubjects<
        | typeof User
        | typeof Client
        | typeof Profile
        | typeof Project
        | typeof Designation
        | typeof Team
        | typeof Task
    >
    | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder(
            Ability as AbilityClass<AppAbility>,
        );

        if (user.role === Role.Admin) {
            can(Action.Manage, 'all');
        } else if (user.role === Role.Client) {
            can(Action.Manage, Client);
            can(Action.Read, User);
            can(Action.Update, User, { id: user.id });
            can(Action.Read, Profile);
            can(Action.Read, Project);
            cannot(Action.Delete, User).because(
                "You don't have permission to delete User",
            );
            cannot(Action.Create, User).because(
                "You don't have permission to create User",
            );
            cannot(Action.Delete, Profile).because(
                "You don't have permission to delete profile",
            );
            cannot(Action.Create, Profile).because(
                "You don't have permission to create profile",
            );
            cannot(Action.Update, Profile).because(
                "You don't have permission to update profile",
            );
        } else if (user.role === Role.Staff) {
            can(Action.Manage, Profile);
            can(Action.Update, User, { id: user.id });
            can(Action.Read, User);
            can(Action.Read, Client);
            can(Action.Read, Designation);
            can(Action.Read, Team);
            can(Action.Read, Task);
            can(Action.Update, Task);
            cannot(Action.Delete, Task).because(
                "You don't have permission to delete task",
            );
            cannot(Action.Create, Task).because(
                "You don't have permission to create task",
            );
            cannot(Action.Delete, User).because(
                "You don't have permission to delete User",
            );
            cannot(Action.Create, User).because(
                "You don't have permission to create User",
            );
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
