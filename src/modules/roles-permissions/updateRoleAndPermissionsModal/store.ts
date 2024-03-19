import { atom } from 'recoil'
import { IPermission, IRole } from '@/common/types'

export enum ROLE_MODAL_TYPES {
    NEW = 'NEW',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    VIEW = 'VIEW'
}

export type UpdateRoleModalState = {
    isOpen: boolean
    type: ROLE_MODAL_TYPES | null
    role: IRole | null
}

export type permissionModalState = {
    permission: IPermission | null
}

export const updateRoleModalAtom = atom<UpdateRoleModalState>({
    key: 'UpdateRoleModal',
    default: {
        isOpen: false,
        type: null,
        role: null
    }
})

export const permissionModalAtom = atom<permissionModalState>({
    key: 'PermissionModal',
    default: {
        permission: null
    }
})
