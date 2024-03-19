import Button from "@mui/material/Button";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { USER_MODAL_TYPES, updateUserModalAtom } from "../store";

import { Offcanvas, Table } from "react-bootstrap";

const ViewUser = () => {
  const [userState, setUserState] = useRecoilState(updateUserModalAtom);

  const closeModal = () => {
    setUserState((state) => ({
      ...state,
      user: null,
      type: null,
    }));
  };

  const openModel = () => {
    setUserState((state) => ({
      ...state,
      isOpen: true,
      user: userState?.user,
      type: USER_MODAL_TYPES.EDIT,
    }));
  };

  const data: any = userState?.user;
  const isEdit = userState.type === USER_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "View"} User`;

  const user = {
    Name: data.full_name,
    Email: data.email,
    Mobile: data.mobile,
    Status: data.is_active === 0 ? "Inactive" : "Active",
  };

  return (
    <Offcanvas
      show={userState.isOpen}
      onHide={closeModal}
      placement="end"
      style={{ width: "500px" }}
    >
      <Offcanvas.Header
        className="card-header"
        style={{ borderBottom: "1px solid", color: "#ebecf1" }}
      >
        <Offcanvas.Title className="card-title">{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="box-content" style={{ alignItems: "center" }}>
        <div className="widget-user-image overflow-hidden mx-auto mt-3 mb-5 w-150 h-150">
          <img
            alt="Avatar"
            className="rounded-circle"
            src={
              !data.avatar
                ? "http://138.68.129.51:8000/public/uploads/user/avatar.jpg"
                : data.avatar
            }
          />
        </div>
        <Table className="table mb-0">
          <tbody>
            {Object.entries(user).map(([key, value]: any) => (
              <tr key={key} className="view-content">
                <td className="py-2 px-0 border-top-0">
                  <span
                    className="font-weight-semibold w-50"
                    style={{ textTransform: "capitalize" }}
                  >
                    {key}
                  </span>
                </td>
                <td className="py-2 px-0 border-top-0">{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="card-footer border-0 text-right mb-2 pr-0">
          <Button
            type="submit"
            className="btn-primary mr-2"
            style={{ fontSize: "10px", borderRadius: "20px" }}
            onClick={openModel}
          >
            Edit
          </Button>

          <Button
            className="btn-cancel"
            style={{
              fontSize: "10px",
              borderRadius: "20px",
            }}
            onClick={closeModal}
          >
            cancel
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewUser;
