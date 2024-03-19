//** Import DataGrid */
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

//** Import Type */
import { IRole } from "@/common/types";

//** Import Materia, Icon and Chip */
import { Box, IconButton } from "@mui/material";
//** Import Store */
import {
  ROLE_MODAL_TYPES,
  updateRoleModalAtom,
} from "../updateRoleAndPermissionsModal/store";

//** Import recoil */
import { useSetRecoilState } from "recoil";
import { SORT_DIRECTION } from "@/common/constants";

export type IColumn = GridColDef<IRole> & { isSorted?: boolean };

const columns: IColumn[] = [
  {
    flex: 0.12,
    minWidth: 250,
    field: "role",
    headerName: "Roles",
    isSorted: true,
    sortingOrder: [SORT_DIRECTION.ASC],
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              fontWeight: 500,
            }}
          >
            {row.role}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: "actions",
    headerName: "Actions",
  },
];

export default columns;

export const RowOptions = ({
  row: role,
  canEdit,
  canDelete,
}: {
  row: IRole;
  canEdit: boolean;
  canDelete: boolean;
}) => {
  const setRoleModalState = useSetRecoilState(updateRoleModalAtom);

  const showEditRoleModal = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: true,
      type: ROLE_MODAL_TYPES.EDIT,
      role,
    }));
  };

  const showDeleteRoleModal = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: true,
      type: ROLE_MODAL_TYPES.DELETE,
      role,
    }));
  };

  const showViewPermissionModal = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: true,
      type: ROLE_MODAL_TYPES.VIEW,
      role,
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <IconButton onClick={showViewPermissionModal}>
        <span className="fa-solid fa-clipboard-user table-action-buttons view-action-button"></span>
      </IconButton>
      {canEdit && (
      <IconButton onClick={showEditRoleModal}>
        <span className="fa-solid fa-user-pen table-action-buttons edit-action-button"></span>
      </IconButton>
      )}
      {canDelete && (
        <IconButton onClick={showDeleteRoleModal}>
          <span className="fa-solid fa-user-slash table-action-buttons delete-action-button"></span>
        </IconButton>
      )}
    </Box>
  );
};
