// ** React Imports
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputLabel } from "@mui/material";
import { Col, InputGroup, Offcanvas, Row } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Importing types and utilities
import { ITenant } from "@/common/types";

import { useRefreshTenantsQuery } from "../../Table/store";
import { TENANT_MODAL_TYPES, updateTenantModalAtom } from "../store";

// Import Hooks
import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";

//** Import API */
import TenantApi from "@/services/tenantApis";
//import { Col, Form, InputGroup, Offcanvas, Row } from "react-bootstrap";

const INITIAL_VALUES = {
  id: 0,
  slug: "",
  db_name: "",
  db_host: "",
  db_username: "",
  db_password: "",
  db_port: 0,
};

const EditTenant = () => {
  const [tenantModalState, setTenantModalState] = useRecoilState(
    updateTenantModalAtom
  );
  const [saveAsyncState, executeSave] = useAsync();
  const refreshTenants = useRefreshTenantsQuery();

  // ** Show Password State
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" && tenantModalState.isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tenantModalState.isOpen]);

  const closeModal = () => {
    setTenantModalState((state) => ({
      ...state,
      isOpen: false,
      tenant: null,
      type: null,
    }));
  };
  const isEdit = tenantModalState.type === TENANT_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "Create"} Tenant`;

  const [formData, setFormData] = useState(tenantModalState.tenant);

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
      ? await executeSave(TenantApi.updateTenant(formData as Required<ITenant>))
      : await executeSave(TenantApi.addTenant(formData as Required<ITenant>));

    refreshTenants();
    closeModal();

    toast.success(
      `Tenant has been ${isEdit ? "updated" : "created"} successfully.`,
      {
        autoClose: 4000,
      }
    );
  };

  const validationSchema = yup.object().shape({
    slug: yup
      .string()
      .required("Slug is required")
      .test(
        "contains-non-numeric",
        "Slug must contain at least one non-numeric character",
        (value) => {
          return /\D/.test(value);
        }
      ),
    db_name: yup
      .string()
      .required("Database name is required")
      .test(
        "contains-non-numeric",
        "Database name must be a string",
        (value) => {
          return /\D/.test(value);
        }
      ),
    db_host: yup
      .string()
      .required("Hostname is required")
      .test("contains-non-numeric", "Hostname must be a string", (value) => {
        return /\D/.test(value);
      }),
    db_username: yup
      .string()
      .required("User name is required")
      .test("contains-non-numeric", "Username must be a string", (value) => {
        return /\D/.test(value);
      }),
    db_password: yup.string().required("Password is required"),
    db_port: yup.number().required("Database port number is required"),
  });

  return (
    <>
      <Formik
        initialValues={isEdit ? formData : INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, touched, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Offcanvas
              show={tenantModalState.isOpen}
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
                        <InputLabel>Slug</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter slug"
                          name="slug"
                          className={`form-control ${
                            touched.slug && errors.slug ? "is-invalid" : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.slug}
                        />
                        <ErrorMessage
                          name="slug"
                          component="div"
                          className="error"
                        />
                      </Col>
                      <Col>
                        <InputLabel>Database Name</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter Database name"
                          name="db_name"
                          className={`form-control ${
                            touched.db_name && errors.db_name
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.db_name}
                        />
                        <ErrorMessage
                          name="db_name"
                          component="div"
                          className="error"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputLabel>Hostname</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter Hostname"
                          name="db_host"
                          className={`form-control ${
                            touched.db_host && errors.db_host
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.db_host}
                        />
                        <ErrorMessage
                          name="db_host"
                          component="div"
                          className="error"
                        />
                      </Col>
                      <Col>
                        <InputLabel>Username</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter Username"
                          name="db_username"
                          className={`form-control ${
                            touched.db_username && errors.db_username
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.db_username}
                        />
                        <ErrorMessage
                          name="db_username"
                          component="div"
                          className="error"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputLabel>Password</InputLabel>

                        <InputGroup className="mb-3">
                          <Field
                            type={showPassword ? `text` : `password`}
                            name="db_password"
                            placeholder="Enter Password"
                            className={`form-control ${
                              touched.db_password && errors.db_password
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, setFieldValue)}
                            value={values.db_password}
                          />
                          <InputGroup.Text
                            onClick={() => setShowPassword(!showPassword)}
                            className={
                              showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                            }
                          ></InputGroup.Text>
                        </InputGroup>

                        <ErrorMessage
                          name="db_password"
                          component="div"
                          className="error"
                        />
                      </Col>
                      <Col>
                        <InputLabel>Port Number</InputLabel>
                        <Field
                          type="number"
                          placeholder="Enter port numbar"
                          name="db_port"
                          className={`form-control ${
                            touched.db_port && errors.db_port
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.db_port}
                        />
                        <ErrorMessage
                          name="db_port"
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
                        Cancel
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
    </>
  );
};
export default EditTenant;
