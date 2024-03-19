// ** MUI Imports
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { RECOIL_ASYNC_STATE } from "@/common/constants";
import DataGridGeneric from "@/components/DataGridGeneric";
import RolesApi from "@/services/roleApis";
import {
  permissionRowsAtom,
  permissionsQuery,
  RefreshRolesQuery,
} from "../../Table/store";
import { updateRoleModalAtom } from "../store";
import { Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";

const PermissionsList = () => {
  const [roleState, setRoleState] = useRecoilState(updateRoleModalAtom);
  const rolesLoadable = useRecoilValueLoadable(permissionsQuery);
  const rows: any = useRecoilValue(permissionRowsAtom);

  const [permissionData, setPermissionData] = useState([]);
  const isLoading = rolesLoadable.state === RECOIL_ASYNC_STATE.LOADING;
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userData")!)
  );

  useEffect(() => {
    setPermissionData(rows);
  }, [rows]);

  const permissionColumns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: "module",
      sortable: false,
      headerName: "Modules",
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
                {row.name}
              </Typography>
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
      headerName: "Permissions",
      renderCell: ({ row }: any) => (
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          {Object.entries(row.permissions).map(
            ([permissionType, isChecked]:any) => (
              <FormControlLabel
                key={permissionType}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(event) =>
                      handlePermissionChange(event, row.id, permissionType)
                    }
                    color="primary"
                  />
                }
                sx={{ fontFamily: "sans-serif" }}
                label={permissionType}
              />
            )
          )}
        </Box>
      ),
    },
  ];

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    moduleId: number,
    permission: string
  ) => {
    setPermissionData((prevData: any) => {
      const updatedData = prevData.map((modules: any) => {
        if (modules.id === moduleId) {
          const updatedPermissions = {
            ...modules.permissions,
            [permission]: event.target.checked,
          };
          return {
            ...modules,
            permissions: updatedPermissions,
          };
        }
        return modules;
      });
      return updatedData;
    });
  };

  const closeModal = () => {
    setRoleState((state) => ({
      ...state,
      isOpen: false,
      role: roleState.role,
      type: roleState.type,
    }));
  };

  const onSubmit = async () => {
    const data: any = {
      role_id: roleState.role?.id,
      permissions: permissionData,
    };
    // await executeSave(RolesApi.managePermissionsOfRole(data));
    const response: any = await RolesApi.managePermissionsOfRole(data);
    // .then(async () => {
    //   const response: any = await AuthApi.getPermissions(roleState.role?.id);
    //   if (response.statusCode === 200) {
    //     toast.success(
    //       `${roleState.role?.role}'s Permissions updated successfully.`
    //     );
    //     userData.modulesPermission = response.result?.items;
    //     setUserData(userData);
    //     window.localStorage.setItem("userData", JSON.stringify(userData));
    //     useRefreshRolesQuery();
    //   }
    // })
    // .catch(() => {
    //   console.log("error occured");
    // });

    if (response.statusCode === 200) {
      toast.success(
        `${roleState.role?.role}'s Permissions updated successfully.`
      );
      userData.modulesPermission = response.result?.items;
      setUserData(userData);
      window.localStorage.setItem("userData", JSON.stringify(userData));
      RefreshRolesQuery();
    } else {
      console.log("error");
    }
    closeModal();
  };

  return (
    <Offcanvas
      show={roleState.isOpen}
      onHide={closeModal}
      placement="end"
      style={{ width: "900px" }}
    >
      <Offcanvas.Header
        className="card-header"
        style={{ borderBottom: "1px solid", color: "#ebecf1" }}
        closeButton
      >
        <Offcanvas.Title className="card-title">
          {roleState.role?.role}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="box-content">
        <DataGridGeneric
          moduleName="Roles"
          loading={isLoading}
          rows={permissionData}
          columns={permissionColumns}
          disableRowSelectionOnClick
          hideFooterPagination
        />
        <div className="card-footer border-0 text-right mb-2 pr-0">
          <Button
            className="btn-cancel mr-2"
            style={{
              fontSize: "10px",
              borderRadius: "20px",
            }}
            onClick={closeModal}
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="btn-primary"
            style={{ fontSize: "10px", borderRadius: "20px" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PermissionsList;
