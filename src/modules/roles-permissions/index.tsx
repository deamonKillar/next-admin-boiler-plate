// ** MUI Imports
import { Button, Card, DialogActions, Divider, Grid } from "@mui/material";

// ** Custom Table Components Imports
import { Suspense } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import RoleTable from "./Table";
import Header from "./Table/Header";
import Title from "./Title";
import DeleteRole from "./updateRoleAndPermissionsModal/Delete";
import EditRole from "./updateRoleAndPermissionsModal/Edit";
import PermissionsList from "./updateRoleAndPermissionsModal/Permissions";
import {
  ROLE_MODAL_TYPES,
  updateRoleModalAtom,
} from "./updateRoleAndPermissionsModal/store";
import { Breadcrumb } from "react-bootstrap";
import useCan from "@/common/hooks/useCan";

const UpdateRoleModal = () => {
  const roleModalState = useRecoilValue(updateRoleModalAtom);
  switch (roleModalState.type) {
    case ROLE_MODAL_TYPES.EDIT:
    case ROLE_MODAL_TYPES.NEW:
      return <EditRole />;
    case ROLE_MODAL_TYPES.DELETE:
      return <DeleteRole />;
    case ROLE_MODAL_TYPES.VIEW:
      return <PermissionsList />;
    default:
      return null;
  }
};
const RoleList = () => {
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
    <>
      <div className="page-header mt-5-7 ml-4">
        <div className="page-leftheader">
          <h4 className="page-title mb-0">All Roles</h4>
          <Breadcrumb>
            <Breadcrumb.Item>
              <i className="fa-solid fa-chart-tree-map mr-2 fs-12" />
              Admin
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/roles" active>
              Role List
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {ability.can("create", "Roles") && (
                <DialogActions sx={{ pt: 1, pb: 1, pl: 0, pr: 0 }}>
                  <Button
                    variant="contained"
                    sx={{ "& svg": { mr: 2 }, borderRadius: "20px" }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      fontSize: "14px",
                    }}
                    onClick={showAddRole}
                  >
                    <span style={{ fontSize: "0.7rem" }}>Create Role</span>
                  </Button>
                </DialogActions>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Grid className="col-lg-12 col-md-12 col-xm-12">
        <Grid item xs={12}>
          <Card className="card border-0">
            <ErrorBoundary>
              <Title />
            </ErrorBoundary>
            <Divider />
            <div className="card-body pt-2 app-info-form">
              <div className="box-content">
                <ErrorBoundary>
                  <Header />
                </ErrorBoundary>
                <ErrorBoundary>
                  <RoleTable />
                </ErrorBoundary>
              </div>
            </div>
          </Card>
        </Grid>

        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <UpdateRoleModal />
          </ErrorBoundary>
        </Suspense>
      </Grid>
    </>
  );
};

export default RoleList;
