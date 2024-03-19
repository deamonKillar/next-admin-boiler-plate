import { Suspense } from "react";
import { Button, Card, DialogActions, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import UserTable from "./Table";
import Header from "./Table/Header";
import Title from "./Title";
import DeleteUser from "./UpdateUserModal/Delete";
import EditUser from "./UpdateUserModal/Edit";
import ViewUser from "./UpdateUserModal/View";
import { USER_MODAL_TYPES, updateUserModalAtom } from "./UpdateUserModal/store";
import { Breadcrumb } from "react-bootstrap";
import useCan from "@/common/hooks/useCan";

const UpdateUserModal = () => {
  const userModalState = useRecoilValue(updateUserModalAtom);

  switch (userModalState.type) {
    case USER_MODAL_TYPES.EDIT:
    case USER_MODAL_TYPES.NEW:
      return <EditUser />;
    case USER_MODAL_TYPES.DELETE:
      return <DeleteUser />;
    case USER_MODAL_TYPES.VIEW:
      return <ViewUser />;
    default:
      return null;
  }
};

const UserList = () => {
  const ability = useCan();
  const setUserModalState = useSetRecoilState(updateUserModalAtom);

  const showAddUser = () => {
    setUserModalState((state) => ({
      ...state,
      isOpen: true,
      type: USER_MODAL_TYPES.NEW,
      user: null,
    }));
  };
  return (
    <>
      <div className="page-header mt-5-7 ml-4">
        <div className="page-leftheader">
          <h4 className="page-title mb-0">All Registered Users</h4>
          <Breadcrumb>
            <Breadcrumb.Item>
              <i className="fa-solid fa-chart-tree-map mr-2 fs-12" />
              Admin
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/users" active>
              User List
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {ability.can("create", "Users") && (
                <DialogActions sx={{ pt: 1, pb: 1, pl: 0, pr: 0 }}>
                  <Button
                    variant="contained"
                    sx={{ "& svg": { mr: 2 }, borderRadius: "20px" }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      fontSize: "14px",
                    }}
                    onClick={showAddUser}
                  >
                    <span style={{ fontSize: "0.7rem" }}>Create User</span>
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
                <UserTable />
              </ErrorBoundary>
            </div>
          </div>
        </Card>

        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <UpdateUserModal />
          </ErrorBoundary>
        </Suspense>
      </Grid>
    </>
  );
};

export default UserList;
