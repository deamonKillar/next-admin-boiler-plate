import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";
import { ITenant } from "@/common/types";
import Delete from "@/components/Delete";
import TenantApis from "@/services/tenantApis";
import { useRefreshTenantsQuery } from "../../Table/store";
import { updateTenantModalAtom } from "../store";

const title = "Tenant";
const label = "tenant-delete";

const DeleteTenant = () => {
  const [tenantModalState, setTenantModalState] = useRecoilState(
    updateTenantModalAtom
  );
  const [saveAsyncState, executeSave] = useAsync();
  const refreshTenants = useRefreshTenantsQuery();

  const closeModal = () => {
    setTenantModalState((state) => ({
      ...state,
      isOpen: false,
      tenant: null,
      type: null,
    }));
  };

  const confirmDelete = async () => {
    await executeSave(
      TenantApis.deleteTenant(tenantModalState.tenant as Required<ITenant>)
    );
    refreshTenants();
    closeModal();

    toast.success(`${title} has been deleted successfully.`, {
      autoClose: 4000,
    });
  };

  return (
    <Delete
      title={title}
      label={label}
      isOpen={tenantModalState.isOpen}
      onClose={closeModal}
      asyncState={saveAsyncState}
      onConfirm={confirmDelete}
    />
  );
};

export default DeleteTenant;
