/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Client } from "../client/entities/client.entity";
import { Profile } from "../profile/entities/profile.entity";
import { User } from "../user/entities/user.entity";
import { Action } from "./action";

export type Subjects = InferSubjects<typeof User | typeof Client | typeof Profile> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

        if (user.role === 'admin') {
            can(Action.Manage, 'all');

            cannot(Action.Delete, Client).because('You can not delete clients');

        } else if (user.role === 'client') {
            can(Action.Manage, Client)
            can(Action.Read, Profile)
            cannot(Action.Delete, Profile).because('You can not delete a profile')
        } else if (user.role === 'staff') {
            can(Action.Manage, Profile)
            cannot(Action.Create, User).because('You can not create a user')
            cannot(Action.Read, Client).because('You can not read clients')
            cannot(Action.Delete, Client).because(`You can't delete a client`)
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>
        });

    }
}