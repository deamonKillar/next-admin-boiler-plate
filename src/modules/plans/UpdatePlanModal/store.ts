import { atom } from 'recoil'
import { IPlan } from '@/common/types'

export enum PLAN_MODAL_TYPES {
  NEW = 'NEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  VIEW = 'VIEW'
}

export type UpdatePlanModalState = {
  isOpen: boolean
  type: PLAN_MODAL_TYPES | null
  plan: IPlan | null
}

export const updatePlanModalAtom = atom<UpdatePlanModalState>({
  key: 'UpdatePlanModal',
  default: {
    isOpen: false,
    type: null,
    plan: null
  }
})
