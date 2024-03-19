// ** React Imports
import { Suspense } from "react";

// ** MUI Imports
import { Card, DialogActions, Divider, Grid, Button } from "@mui/material";
// **Import Components
import ErrorBoundary from "@/components/ErrorBoundary";
import TenantTable from "./Table";
import Header from "./Table/Header";
import Title from "./Title";
import DeleteTenant from "./UpdateTenantModal/Delete";
import EditTenant from "./UpdateTenantModal/Edit";
import ViewTenant from "./UpdateTenantModal/View";
import SubscriptionHistory from "./UpdateTenantModal/History";
import {
  TENANT_MODAL_TYPES,
  updateTenantModalAtom,
} from "./UpdateTenantModal/store";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { Breadcrumb } from "react-bootstrap";
import useCan from "@/common/hooks/useCan";

const UpdateTenantModal = () => {
  const userModalState = useRecoilValue(updateTenantModalAtom);

  switch (userModalState.type) {
    case TENANT_MODAL_TYPES.EDIT:
    case TENANT_MODAL_TYPES.NEW:
      return <EditTenant />;
    case TENANT_MODAL_TYPES.DELETE:
      return <DeleteTenant />;
    case TENANT_MODAL_TYPES.VIEW:
      return <ViewTenant />;
    case TENANT_MODAL_TYPES.HISTORY:
      return <SubscriptionHistory />;
    default:
      return null;
  }
};

const TenantList = () => {
  const ability = useCan();

  const setTenantModalState = useSetRecoilState(updateTenantModalAtom);

  const showAddTenant = () => {
    setTenantModalState((state) => ({
      ...state,
      isOpen: true,
      type: TENANT_MODAL_TYPES.NEW,
      tanant: null,
    }));
  };
  return (
    <>
      <div className="page-header mt-5-7 ml-4">
        <div className="page-leftheader">
          <h4 className="page-title mb-0">All Registered Tenants</h4>
          <Breadcrumb>
            <Breadcrumb.Item>
              <i className="fa-solid fa-chart-tree-map mr-2 fs-12" />
              Admin
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Tenant List</Breadcrumb.Item>
            <Breadcrumb.Item>
              {ability.can("create", "Tenants") && (
                <DialogActions sx={{ pt: 1, pb: 1, pl: 0, pr: 0 }}>
                  <Button
                    variant="contained"
                    sx={{ "& svg": { mr: 2 }, borderRadius: "20px" }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      fontSize: "14px",
                    }}
                    onClick={showAddTenant}
                  >
                    <span style={{ fontSize: "0.7rem" }}>Create Tenant</span>
                  </Button>
                </DialogActions>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Grid className="col-lg-12 col-md-12 col-xm-12">
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
                <TenantTable />
              </ErrorBoundary>
            </div>
          </div>
        </Card>

        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <UpdateTenantModal />
          </ErrorBoundary>
        </Suspense>
      </Grid>
    </>
  );
};

export default TenantList;
