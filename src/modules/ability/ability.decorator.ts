/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Client } from '../client/entities/client.entity';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { Subjects } from './ability.factory';
import { Action } from './action.enum';

export interface RequiredRole {
    action: Action;
    subject: Subjects;
}

export const CHECK_Ability = 'check-ability';

export const checkAbilities = (...requirements: RequiredRole[]) =>
    SetMetadata(CHECK_Ability, requirements);

export class ReadUserAbility implements RequiredRole {
    action = Action.read;
    subject = User;
}

export class DeleteUserAbility implements RequiredRole {
    action = Action.delete;
    subject = User;
}

export class ReadProfileAbility implements RequiredRole {
    action = Action.read;
    subject = Profile;
}

export class ReadClientAbility implements RequiredRole {
    action = Action.delete;
    subject = Client;
}
