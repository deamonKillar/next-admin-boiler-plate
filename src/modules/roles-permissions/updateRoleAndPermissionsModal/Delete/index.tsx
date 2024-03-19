import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";
import { IRole } from "@/common/types";
import Delete from '@/components/Delete'
import RolesApi from "@/services/roleApis";
import { RefreshRolesQuery } from "../../Table/store";
import { updateRoleModalAtom } from "../store";

const title = "Role";
const label = "role-delete";

const DeleteRole = () => {
  const [roleMadalState, setRoleModalState] =
    useRecoilState(updateRoleModalAtom);
  const [saveAsyncState, executeSave] = useAsync();
  const refreshRoles = RefreshRolesQuery();

  const closeModel = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: false,
      role: null,
      type: null,
    }));
  };

  const confirmDelete = async () => {
    await executeSave(
      RolesApi.deleteRole(roleMadalState.role as Required<IRole>)
    );
    refreshRoles();
    closeModel();

    toast.success(`${title} has been deleted successfully.`, {
      autoClose: 4000,
    });
  };

  return (
    <Delete
      title={title}
      label={label}
      isOpen={roleMadalState.isOpen}
      onClose={closeModel}
      asyncState={saveAsyncState}
      onConfirm={confirmDelete}
    />
  );
};

export default DeleteRole;
