import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";

import { InputLabel } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";

import Offcanvas from "react-bootstrap/Offcanvas";

import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";
import { IRole } from "@/common/types";
import { RefreshRolesQuery } from "../../Table/store";
import { ROLE_MODAL_TYPES, updateRoleModalAtom } from "../store";

//**Import API */
import RolesApi from "@/services/roleApis";
import { Col, Row, Button } from "react-bootstrap";
import { useState } from "react";

const INITIAL_VALUES = {
  id: 0,
  role: "",
};

const EditRole = () => {
  const [roleModalState, setRoleModalState] =
    useRecoilState(updateRoleModalAtom);
  const [saveAsyncState, executeSave] = useAsync();
  const refreshRoles = RefreshRolesQuery();
  const [formData, setFormData] = useState(roleModalState.role);
  const closeModal = () => {
    setRoleModalState((state) => ({
      ...state,
      isOpen: false,
      role: null,
      type: null,
    }));
  };

  const isEdit = roleModalState.type === ROLE_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "Create"} Role`;

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
      ? await executeSave(RolesApi.updateRole(formData as Required<IRole>))
      : await executeSave(RolesApi.addRole(formData as Required<IRole>));
    refreshRoles();
    closeModal();

    toast.success(
      `Role has been ${isEdit ? "updated" : "created"} successfully. `,
      {
        autoClose: 4000,
      }
    );
  };

  const validationSchema = yup.object().shape({
    role: yup.string().required("Role is required"),
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
            show={roleModalState.isOpen}
            onHide={closeModal}
            placement="end"
          >
            <Offcanvas.Header>
              <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="card-body p-2 app-info-form">
              <div className="card-body p-2 app-info-form">
                <div className="box-content">
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                      <Col>
                        <InputLabel>Role</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter role"
                          name="role"
                          className={`form-control ${
                            touched.role && errors.role ? "is-invalid" : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.role}
                        />
                        <ErrorMessage
                          name="role"
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
                        variant="secondary"
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
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Form>
      )}
    </Formik>
  );
};

export default EditRole;
