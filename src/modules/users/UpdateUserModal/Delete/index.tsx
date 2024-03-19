import { useRecoilState } from 'recoil'
import { IUser } from '@/common/types'
import { useRefreshUsersQuery } from '../../Table/store'
import { updateUserModalAtom } from '../store'
import useAsync from '@/common/hooks/useAsync'
import UserApi from '@/services/userApis'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from '@/components/Delete'

const title = 'User'
const label = 'user-delete'

const DeleteUser = () => {
  const [userModalState, setUserModalState] = useRecoilState(updateUserModalAtom)
  const [saveAsyncState, executeSave] = useAsync()
  const refreshUsers = useRefreshUsersQuery()

  const closeModal = () => {
    setUserModalState(state => ({
      ...state,
      isOpen: false,
      user: null,
      type: null
    }))
  }

  const confirmDelete = async () => {
    await executeSave(UserApi.deleteUser(userModalState.user as Required<IUser>))
    refreshUsers()
    closeModal()

    toast.success(`${title} has been deleted successfully.`, {
      autoClose: 4000
    })
  }

  return (
    <Delete
      title={title}
      label={label}
      isOpen={userModalState.isOpen}
      onClose={closeModal}
      asyncState={saveAsyncState}
      onConfirm={confirmDelete}
      // onClick={() => deleteUser(item.id)}
    />
  )
}

export default DeleteUser
