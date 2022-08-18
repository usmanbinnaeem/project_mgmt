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
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { Action } from './action.enum';

export type Subjects =
    | InferSubjects<typeof User | typeof Profile | typeof Client>
    | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder(
            Ability as AbilityClass<AppAbility>,
        );

        if (user.role === 'admin') {
            can(Action.manage, 'all');
            can(Action.read, Profile)
        } else if (user.role === 'staff') {
            can(Action.manage, Profile);
            cannot(Action.delete, Profile).because(
                `You can't delete your own profile`,
            );
            cannot(Action.manage, Client).because(`You can't manage clients`);
        } else if (user.role === 'client') {
            can(Action.manage, Client);
            cannot(Action.delete, Client).because(
                `You can't delete your own profile`,
            );
            cannot(Action.manage, Profile).because(`You can't manage profiles`);
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
