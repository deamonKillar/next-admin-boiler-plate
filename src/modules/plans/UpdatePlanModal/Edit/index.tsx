import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, InputLabel } from "@mui/material";
import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";
import { useRefreshPlansQuery } from "../../Table/store";
import { PLAN_MODAL_TYPES, updatePlanModalAtom } from "../store";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Offcanvas, Row } from "react-bootstrap";
import PlanApi from "@/services/planApis";
import { useEffect, useState } from "react";
import { IPlan } from "@/common/types";

const INITIAL_VALUES = {
  id: 0,
  plan_type: "",
  monthly_price: "",
  yearly_price: "",
  free_trial_days: 0,
};

const EditPlan = () => {
  const [planModalState, setPlanModalState] =
    useRecoilState(updatePlanModalAtom);
  const [saveAsyncState, executeSave] = useAsync();
  const refreshPlans = useRefreshPlansQuery();
  const [formData, setFormData] = useState(planModalState.plan);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" && planModalState.isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [planModalState.isOpen]);

  const closeModal = () => {
    setPlanModalState((state) => ({
      ...state,
      isOpen: false,
      plan: null,
      type: null,
    }));
  };
  const isEdit = planModalState.type === PLAN_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "Create"} Plan`;

  const handleChange = (
    event: any,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldValue(name, value);
  };

  const onSubmit = async (e: any) => {
    isEdit
      ? await executeSave(PlanApi.updatePlan(formData as Required<IPlan>))
      : await executeSave(PlanApi.addPlan(formData as Required<IPlan>));

    refreshPlans();
    closeModal();

    toast.success(
      `Plan has been ${isEdit ? "updated" : "created"} successfully.`,
      {
        autoClose: 4000,
      }
    );
  };

  const validationSchema = yup.object().shape({
    plan_type: yup
      .string()
      .required("Plan type is required")
      .test(
        "contains-non-numeric",
        "Plan type must contain at least one non-numeric character",
        (value) => {
          return /\D/.test(value);
        }
      ),
    monthly_price: yup
      .mixed()
      .test("is-number", "Monthly price must be a number", (value: any) => {
        return /^\d+(\.\d+)?$/.test(value);
      })
      .required("Monthly price is required"),
    yearly_price: yup
      .mixed()
      .test("is-number", "Yearly price must be a number", (value: any) => {
        return /^\d+(\.\d+)?$/.test(value);
      })
      .required("Yearly price is required"),
    free_trial_days: yup
      .mixed()
      .test("is-number", "Free trial days must be a number", (value: any) => {
        return /^\d+(\.\d+)?$/.test(value);
      })
      .required("Free trial days is required"),
  });

  return (
    <Formik
      initialValues={isEdit ? formData : INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, touched, errors, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Offcanvas
            show={planModalState.isOpen}
            onHide={closeModal}
            placement="end"
            style={{ width: "700px" }}
          >
            <Offcanvas.Header>
              <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="card-body p-2 app-info-form">
              <div className="box-content">
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-4">
                    <Col>
                      <InputLabel>Plan type</InputLabel>
                      <Field
                        type="text"
                        placeholder="Enter plan type"
                        name="plan_type"
                        className={`form-control ${
                          touched.plan_type && errors.plan_type
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, setFieldValue)
                        }
                        value={values.plan_type}
                      />
                      <ErrorMessage
                        name="plan_type"
                        component="div"
                        className="error"
                      />
                    </Col>
                    <Col>
                      <InputLabel>Monthly price</InputLabel>

                      <Field
                        type="text"
                        placeholder="Enter monthly price"
                        name="monthly_price"
                        className={`form-control ${
                          touched.monthly_price && errors.monthly_price
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, setFieldValue)
                        }
                        value={values.monthly_price}
                      />
                      <ErrorMessage
                        name="monthly_price"
                        component="div"
                        className="error"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <InputLabel>Yearly price</InputLabel>

                      <Field
                        type="text"
                        placeholder="Enter yearly price"
                        name="yearly_price"
                        className={`form-control ${
                          touched.yearly_price && errors.yearly_price
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, setFieldValue)
                        }
                        value={values.yearly_price}
                      />
                      <ErrorMessage
                        name="yearly_price"
                        component="div"
                        className="error"
                      />
                    </Col>
                    <Col>
                      <InputLabel>Free trial days</InputLabel>

                      <Field
                        type="text"
                        placeholder="Enter free trial days"
                        name="free_trial_days"
                        className={`form-control ${
                          touched.free_trial_days && errors.free_trial_days
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, setFieldValue)
                        }
                        value={values.free_trial_days}
                      />
                      <ErrorMessage
                        name="free_trial_days"
                        component="div"
                        className="error"
                      />
                    </Col>
                  </Row>

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
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Form>
      )}
    </Formik>
  );
};

export default EditPlan;
