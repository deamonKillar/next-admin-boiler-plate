// ** Icon Imports
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { PLAN_MODAL_TYPES, updatePlanModalAtom } from "../store";

import { Offcanvas, Table } from "react-bootstrap";

const ViewPlan = () => {
  const [planState, setPlanState] = useRecoilState(updatePlanModalAtom);

  const closeModal = () => {
    setPlanState((state) => ({
      ...state,
      plan: null,
      type: null,
    }));
  };

  const openModel = () => {
    setPlanState((state) => ({
      ...state,
      isOpen: true,
      plan: planState?.plan,
      type: PLAN_MODAL_TYPES.EDIT,
    }));
  };

  const data: any = planState?.plan;
  const isEdit = planState.type === PLAN_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "View"} Plan`;

  const plan = {
    "Plan type": data.plan_type,
    "Monthly price": data.monthly_price,
    "Yearly price": data.yearly_price,
    "Free trial days": data.free_trial_days,
  };

  return (
    <Offcanvas show={planState.isOpen} onHide={closeModal} placement="end">
      <Offcanvas.Header
        className="card-header"
        style={{ borderBottom: "1px solid", color: "#ebecf1" }}
      >
      <Offcanvas.Title className="card-title">{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="box-content">
        <Table>
          <tbody>
            {Object.entries(plan).map(([key, value]: any) => (
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

export default ViewPlan;
