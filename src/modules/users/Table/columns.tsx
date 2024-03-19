//** Import DataGrid */
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

//** Import Type */
import { IUser } from "@/common/types";
import { Box, IconButton } from "@mui/material";
import {
  USER_MODAL_TYPES,
  updateUserModalAtom,
} from "../UpdateUserModal/store";

//** Import recoil */
import { useSetRecoilState } from "recoil";
import { SORT_DIRECTION } from "@/common/constants";
export type IColumn = GridColDef<IUser> & { isSorted?: boolean };

const columns: IColumn[] = [
  {
    flex: 0.15,
    minWidth: 280,
    field: "full_name",
    headerName: "Name",
    isSorted: true,
    sortingOrder: [SORT_DIRECTION.ASC],
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <div className="d-flex">
              <div className="widget-user-image-sm overflow-hidden mr-4">
                <img
                  alt="Avatar"
                  className="rounded-circle"
                  src={
                    !row.avatar
                      ? "http://138.68.129.51:8000/public/uploads/user/avatar.jpg"
                      : row.avatar
                  }
                />
              </div>
              <div className="widget-user-name">
                <span className="font-weight-bold">{row.full_name}</span> <br />{" "}
                <span className="text-muted">{row.email}</span>
              </div>
            </div>
          </Box>
        </Box>
      );
    },
  },

  {
    flex: 0.1,
    minWidth: 120,
    headerName: "Contact No.",
    field: "mobile",
    renderCell: ({ row }) => {
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
            +91-{row.mobile}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "is_active",
    headerName: "Status",
    renderCell: ({ row }) => {
      return (
        <Box
          sx={{
            color: "text.secondary",
          }}
          className={
            row.is_active === 1
              ? "cell-box user-active"
              : "cell-box user-inactive"
          }
        >
          {row.is_active === 1 ? "Active" : "Inactive"}
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
  row: user,
  canEdit,
  canDelete,
}: {
  row: IUser;
  canEdit: boolean;
  canDelete: boolean;
}) => {
  const setUserModalState = useSetRecoilState(updateUserModalAtom);

  const showEditUserModal = () => {
    setUserModalState((state) => ({
      ...state,
      isOpen: true,
      type: USER_MODAL_TYPES.EDIT,
      user,
    }));
  };

  const showDeleteUserModal = () => {
    setUserModalState((state) => ({
      ...state,
      isOpen: true,
      type: USER_MODAL_TYPES.DELETE,
      user,
    }));
  };

  const showViewUserPage = () => {
    setUserModalState((state: any) => ({
      ...state,
      isOpen: true,
      type: USER_MODAL_TYPES.VIEW,
      user,
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <IconButton onClick={showViewUserPage}>
        <span className="fa-solid fa-clipboard-user table-action-buttons view-action-button"></span>
      </IconButton>
      {canEdit && (
        <IconButton onClick={showEditUserModal}>
          <span className="fa-solid fa-user-pen table-action-buttons edit-action-button"></span>
        </IconButton>
      )}
      {canDelete && (
        <IconButton onClick={showDeleteUserModal}>
          <span className="fa-solid fa-user-slash table-action-buttons delete-action-button"></span>
        </IconButton>
      )}
    </Box>
  );
};
