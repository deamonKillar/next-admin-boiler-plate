//** Import DataGrid */
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

//** Import Type */
import { IPlan } from "@/common/types";

//** Import Materia, Icon and Chip */
import { Box, IconButton } from "@mui/material";

//** Import Store */
import {
  PLAN_MODAL_TYPES,
  updatePlanModalAtom,
} from "../UpdatePlanModal/store";

//** Import recoil */
import { useSetRecoilState } from "recoil";
import { SORT_DIRECTION } from "@/common/constants";
export type IColumn = GridColDef<IPlan> & { isSorted?: boolean };

const columns: IColumn[] = [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: "Plan type",
    field: "plan_type",
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
              fontWeight: 500,
            }}
          >
            {row.plan_type}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: "Monthly price",
    field: "monthly_price",
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
            {row.monthly_price}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    headerName: "Yearly price",
    field: "yearly_price",
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
            {row.yearly_price}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    headerName: "Free trial days",
    field: "free_trial_days",
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
            {row.free_trial_days}
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
  row: plan,
  canEdit,
  canDelete,
}: {
  row: IPlan;
  canEdit: boolean;
  canDelete: boolean;
}) => {
  const setPlanModalState = useSetRecoilState(updatePlanModalAtom);

  const showEditPlanModal = () => {
    setPlanModalState((state) => ({
      ...state,
      isOpen: true,
      type: PLAN_MODAL_TYPES.EDIT,
      plan,
    }));
  };

  const showDeletePlanModal = () => {
    setPlanModalState((state) => ({
      ...state,
      isOpen: true,
      type: PLAN_MODAL_TYPES.DELETE,
      plan,
    }));
  };

  const showViewPlanPage = () => {
    setPlanModalState((state: any) => ({
      ...state,
      isOpen: true,
      type: PLAN_MODAL_TYPES.VIEW,
      plan,
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <IconButton onClick={showViewPlanPage}>
        <span className="fa-solid fa-clipboard-user table-action-buttons view-action-button"></span>
      </IconButton>
      {canEdit && (
      <IconButton onClick={showEditPlanModal}>
        <span className="fa-solid fa-user-pen table-action-buttons edit-action-button"></span>
      </IconButton>
      )}
      {canDelete && (
      <IconButton onClick={showDeletePlanModal}>
        <span className="fa-solid fa-user-slash table-action-buttons delete-action-button"></span>
      </IconButton>
      )}
    </Box>
  );
};
