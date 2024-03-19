import { Box, DialogActions } from "@mui/material";

import useCan from "@/common/hooks/useCan";
import {
  ROLE_MODAL_TYPES,
  updateRoleModalAtom,
} from "../updateRoleAndPermissionsModal/store";
import { useSetRecoilState } from "recoil";

const Title = () => {
  const ability = useCan();
  const setRoleModalState = useSetRecoilState(updateRoleModalAtom);
  const showAddRole = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: true,
      type: ROLE_MODAL_TYPES.NEW,
      role: null,
    }));
  };
  return (
    <Box className="card-header">
      <h3 className="card-title">Manage Role</h3>
    </Box>
  );
};

export default Title;
