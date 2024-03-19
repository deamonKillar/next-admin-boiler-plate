// ** React Imports
import { Suspense } from "react";

// ** MUI Imports
import { Card, DialogActions, Grid, Button } from "@mui/material";

// ** Custom Table Components Imports
import { useRecoilValue, useSetRecoilState } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import PlanTable from "./Table";
import Header from "./Table/Header";
import Title from "./Title";
import DeletePlan from "./UpdatePlanModal/Delete";
import EditPlan from "./UpdatePlanModal/Edit";
import ViewPlan from "./UpdatePlanModal/View";
import { PLAN_MODAL_TYPES, updatePlanModalAtom } from "./UpdatePlanModal/store";
import { Breadcrumb } from "react-bootstrap";
import useCan from "@/common/hooks/useCan";

const UpdatePlanModal = () => {
  const planModalState = useRecoilValue(updatePlanModalAtom);

  switch (planModalState.type) {
    case PLAN_MODAL_TYPES.EDIT:
    case PLAN_MODAL_TYPES.NEW:
      return <EditPlan />;
    case PLAN_MODAL_TYPES.DELETE:
      return <DeletePlan />;
    case PLAN_MODAL_TYPES.VIEW:
      return <ViewPlan />;
    default:
      return null;
  }
};

const PlanList = () => {

  const ability = useCan();

  const setUserModalState = useSetRecoilState(updatePlanModalAtom);

  const showAddPlan = () => {
    setUserModalState((state) => ({
      ...state,
      isOpen: true,
      type: PLAN_MODAL_TYPES.NEW,
      plan: null,
    }));
  };

  return (
    <>
       <div className="page-header mt-5-7 ml-4">
        <div className="page-leftheader">
          <h4 className="page-title mb-0">All Created Plan</h4>
          <Breadcrumb>
            <Breadcrumb.Item>
              <i className="fa-solid fa-chart-tree-map mr-2 fs-12" />
              Admin
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/plans" active>
              Plan List
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {ability.can("create", "Subscriptions") && (
                <DialogActions sx={{ pt: 1, pb: 1, pl: 0, pr: 0 }}>
                  <Button
                    variant="contained"
                    sx={{ "& svg": { mr: 2 }, borderRadius: "20px" }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      fontSize: "14px",
                    }}
                    onClick={showAddPlan}
                  >
                    <span style={{ fontSize: "0.7rem" }}>Create Plan</span>
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
          <div className="card-body pt-2 app-info-form">
            <div className="box-content">
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              <ErrorBoundary>
                <PlanTable />
              </ErrorBoundary>
            </div>
          </div>
        </Card>

        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <UpdatePlanModal />
          </ErrorBoundary>
        </Suspense>
      </Grid>
    </>
  );
};

export default PlanList;
