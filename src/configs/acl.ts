import { Ability, AbilityBuilder } from '@casl/ability'

export type Subjects = string
export type Actions = 'handle' | 'create' | 'edit' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
    action: Actions
    subject: string
}

interface GetSubject {
    [key: string]: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: any, subject: object) => {
    const { can, rules } = new AbilityBuilder(AppAbility)

    can('handle', 'dashboard'); // Define the default dashboard permission

    //TODO: Permission loop for set the dynamic permission when the user is logged in.
    for (let [module, permission] of Object.entries(subject)) {
        const permissionArr = Object.keys(permission).filter(key => permission[key] === true).map(key => key === 'manage' ? 'handle' : key);
        can(permissionArr, module)
    }

    return rules
}

export const buildAbilityFor = (role: any, subject: object): AppAbility => {
    return new AppAbility(defineRulesFor(role, subject), {
        // https://casl.js.org/v5/en/guide/subject-type-detection
        // @ts-ignore
        detectSubjectType: object => object!.type
    })
}

export const defaultACLObj: ACLObj = {
    action: 'handle',
    subject: 'dashboard'
}
//** Define the routes and the it's role based permission */
export const getSubject: GetSubject = {
    dashboard: 'dashboard',
    users: 'Users',
    roles: 'Roles',
    settings: 'Settings',
    tenants: "Tenants",
    // subscribe_plan: "Subscriptions",
    plans: "Subscriptions",
    // login: "Auth",
    logout: "Auth",
    // forgot_password: "Auth",
    // resetPassword: "Auth",
}

export default defineRulesFor
