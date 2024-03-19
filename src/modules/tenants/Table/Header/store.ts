import { atom } from 'recoil'
import { BaseFilter } from '@/common/types'

// * Tenant filter atom with types
export const filterValueAtom = atom(<BaseFilter>{
    key: 'TenantsHeader/filterValue',
    default: {
        search: '',
    }
})