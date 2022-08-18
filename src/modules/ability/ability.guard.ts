/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_Ability, RequiredRole } from './ability.decorator';
import { AbilityFactory } from './ability.factory';

export class AbilitiesGuards implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        console.log("---------> ", context.getHandler());
        const rules =
            this.reflector.get<RequiredRole[]>(CHECK_Ability, context.getHandler()) ||
            [];

        console.log(rules);
        console.log(context.getHandler());

        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.defineAbility(user);

        try {
            rules.forEach((rule) =>
                ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
            );
            return true;
        } catch (error) {
            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message);
            }
        }
    }
}
