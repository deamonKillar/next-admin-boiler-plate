import { useRecoilState } from "recoil";
import { TENANT_MODAL_TYPES, updateTenantModalAtom } from "../store";

// ** Mui Imports
import { Offcanvas, Table } from "react-bootstrap";
import { Button } from "@mui/material";

const ViewTenant = () => {
  const [tenantState, setTenantState] = useRecoilState(updateTenantModalAtom);

  const closeModal = () => {
    setTenantState((state) => ({
      ...state,
      tenant: null,
      type: null,
    }));
  };

  const openModel = () => {
    setTenantState((state) => ({
      ...state,
      isOpen: true,
      user: tenantState?.tenant,
      type: TENANT_MODAL_TYPES.EDIT,
    }));
  };

  const data: any = tenantState?.tenant;
  const isEdit = tenantState.type === TENANT_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "View"} Tenant`;

  const tenant = {
    Slug:data.slug,
    Database:data.db_name,
    Hostname:data.db_host,
    Username:data.db_username,
  }

  return (
    <Offcanvas show={tenantState.isOpen} onHide={closeModal} placement="end">
      <Offcanvas.Header
        className="card-header"
        style={{ borderBottom: "1px solid", color: "#ebecf1" }}
      >
        <Offcanvas.Title className="card-title">{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="box-content">
        <Table>
          <tbody>
            {Object.entries(tenant).map(([key, value]: any) => (
              <tr key={key} className="view-content">
                <td className="py-2 px-0 border-top-0">
                  <span className="font-weight-semibold w-50">{key}</span>
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
export default ViewTenant;