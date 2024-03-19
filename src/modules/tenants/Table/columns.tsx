//** Import DataGrid */
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

//** Import Materia, Icon and Chip */
import { Box, IconButton, Typography } from "@mui/material";
import {
  TENANT_MODAL_TYPES,
  updateTenantModalAtom,
} from "../UpdateTenantModal/store";

//** Import recoil */
import { useSetRecoilState } from "recoil";
import { SORT_DIRECTION } from "@/common/constants";
import { ITenant } from "@/common/types";

export type IColumn = GridColDef<ITenant> & { isSorted?: boolean };

const columns: IColumn[] = [
  {
    flex: 0.15,
    minWidth: 280,
    field: "slug",
    headerName: "Slug",
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
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            ></Typography>
            {row.slug}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: "Datbase Name",
    field: "db_name",
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
            <Typography
              noWrap
              sx={{ fontWeight: 500, color: "text.secondary" }}
            ></Typography>
            {row.db_name}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: "Database Host",
    field: "db_host",
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
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            ></Typography>
            {row.db_host}
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: "Database Username",
    field: "db_username",
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
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            ></Typography>
            {row.db_username}
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
  row: tenant,
  canEdit,
  canDelete,
  show,
}: {
  row: ITenant;
  canEdit: boolean;
  canDelete: boolean;
  show: true;
}) => {
  const setTenantModalState = useSetRecoilState(updateTenantModalAtom);

  
  show = true;
  
  const showEditTenantModal = () => {
    setTenantModalState((state) => ({
      ...state,
      isOpen: true,
      type: TENANT_MODAL_TYPES.EDIT,
      tenant,
    }));
  };
  
  const showDeleteTenantModal = () => {
    setTenantModalState((state) => ({
      ...state,
      isOpen: true,
      type: TENANT_MODAL_TYPES.DELETE,
      tenant,
    }));
  };

  const showViewTenantPage = () => {
    setTenantModalState((state: any) => ({
      ...state,
      isOpen: true,
      type: TENANT_MODAL_TYPES.VIEW,
      tenant,
    }));
  };

  const showHistoryOfSubscription = () => {
    setTenantModalState((state: any) => ({
      ...state,
      isOpen: true,
      type: TENANT_MODAL_TYPES.HISTORY,
      tenant,
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      {canEdit && (
        <IconButton onClick={showEditTenantModal}>
          <i className="fa-solid fa-user-pen table-action-buttons edit-action-button"></i>
        </IconButton>
      )}
      {canDelete && (
        <IconButton onClick={showDeleteTenantModal}>
          <i className="fa-solid fa-user-slash table-action-buttons delete-action-button"></i>
        </IconButton>
      )}
      {show && (
        <>
          <IconButton onClick={showViewTenantPage}>
            <i className="fa-solid fa-clipboard-user table-action-buttons view-action-button"></i>
          </IconButton>

          <IconButton onClick={showHistoryOfSubscription}>
            <i className="fa-solid fa-history table-action-buttons history-action-button"></i>
          </IconButton>
        </>
      )}
    </Box>
  );
};

// subscription history

export const subColumns: IColumn[] = [
  {
    flex: 0.1,
    minWidth: 100,
    field: "plan_type",
    headerName: "Plan",
    sortable: false,

    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.plan_type}
            </Typography>
          </Box>
        </Box>
      );
    },
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: "plan_period",
    headerName: "Plan period",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.plan_period}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "monthly_price",
    headerName: "Monthly price",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.monthly_price}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "yearly_price",
    headerName: "Yearly price",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.yearly_price}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "free_trial_days",
    headerName: "Free trial days",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.free_trial_days}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "subscribed_at",
    headerName: "Subscribed at",
    isSorted: true,
    sortingOrder: [SORT_DIRECTION.ASC],
    renderCell: ({ row }: any) => {
      const date = new Date(row.subscribed_at);
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const day = (date.getDate() - 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      const formattedDate = `${month}-${day}-${year}`;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "expired_at",
    headerName: "Expired at",
    isSorted: true,
    sortingOrder: [SORT_DIRECTION.ASC],
    renderCell: ({ row }: any) => {
      const date1 = new Date(row.expired_at);
      const month1 = (date1.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const day1 = (date1.getDate() - 1).toString().padStart(2, "0");
      const year1 = date1.getFullYear();
      const expiredAtformattedDate = `${month1}-${day1}-${year1}`;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {expiredAtformattedDate}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "is_active",
    headerName: "Status",
    sortable: false,
    renderCell: ({ row }: any) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {row.is_active === 1 ? "Active" : "Inactive"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
];
