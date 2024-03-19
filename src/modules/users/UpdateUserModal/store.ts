import { atom } from 'recoil'
import { IUser } from '@/common/types'

export enum USER_MODAL_TYPES {
  NEW = 'NEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  VIEW = 'VIEW'
}

export type UpdateUserModalState = {
  isOpen: boolean
  type: USER_MODAL_TYPES | null
  user: IUser | null
}

export const updateUserModalAtom = atom<UpdateUserModalState>({
  key: 'UpdateUserModal',
  default: {
    isOpen: false,
    type: null,
    user: null
  }
})
