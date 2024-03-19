import { atom } from 'recoil'
import { ITenant } from '@/common/types'

export enum TENANT_MODAL_TYPES {
    NEW = 'NEW',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    VIEW = 'VIEW',
    HISTORY = "HISTORY"
}

export type UpdateTenantModalState = {
    isOpen: boolean
    type: TENANT_MODAL_TYPES | null
    tenant: ITenant | null
}

export const updateTenantModalAtom = atom<UpdateTenantModalState>({
    key: 'UpdateTenantModal',
    default: {
        isOpen: false,
        type: null,
        tenant: null
    }
})
