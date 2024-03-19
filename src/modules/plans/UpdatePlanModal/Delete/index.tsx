import { useRecoilState } from 'recoil'
import { IPlan } from '@/common/types'
import { useRefreshPlansQuery } from '../../Table/store'
import { updatePlanModalAtom } from '../store'
import useAsync from '@/common/hooks/useAsync'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Delete from '@/components/Delete'
import PlanApi from '@/services/planApis'

const title = 'Plan'
const label = 'plan-delete'

const DeletePlan = () => {
  const [planModalState, setPlanModalState] = useRecoilState(updatePlanModalAtom)
  const [saveAsyncState, executeSave] = useAsync()
  const refreshPlans = useRefreshPlansQuery()

  const closeModal = () => {
    setPlanModalState(state => ({
      ...state,
      isOpen: false,
      plan: null,
      type: null
    }))
  }

  const confirmDelete = async () => {
    await executeSave(PlanApi.deletePlan(planModalState.plan as Required<IPlan>))
    refreshPlans()
    closeModal()

    toast.success(`${title} has been deleted successfully.`, {
      autoClose: 4000,
    })
  }

  return (
    <Delete
      title={title}
      label={label}
      isOpen={planModalState.isOpen}
      onClose={closeModal}
      asyncState={saveAsyncState}
      onConfirm={confirmDelete}
      // onClick={() => deletePlan(item.id)}
    />
  )
}

export default DeletePlan
