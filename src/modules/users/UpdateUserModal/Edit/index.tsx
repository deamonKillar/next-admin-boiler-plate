import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputLabel } from "@mui/material";

import { useRecoilState } from "recoil";
import useAsync from "@/common/hooks/useAsync";
import { useRefreshUsersQuery } from "../../Table/store";
import { USER_MODAL_TYPES, updateUserModalAtom } from "../store";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

//** Import API */
import { useEffect, useState } from "react";
import UserApi from "@/services/userApis";

import { Col, InputGroup, Offcanvas, Row } from "react-bootstrap";

const INITIAL_VALUES = {
  id: 0,
  full_name: "",
  email: "",
  mobile: "",
  // is_active: 1,
  avatar: null,
};

const EditUser = () => {
  const [userModalState, setUserModalState] =
    useRecoilState(updateUserModalAtom);
  const [saveAsyncState, executeSave] = useAsync();
  const refreshUsers = useRefreshUsersQuery();

  // ** Show Password State
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" && userModalState.isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userModalState.isOpen]);

  const closeModal = () => {
    setUserModalState((state) => ({
      ...state,
      isOpen: false,
      user: null,
      type: null,
    }));
  };

  const isEdit = userModalState.type === USER_MODAL_TYPES.EDIT;
  const title = `${isEdit ? "Edit" : "Create"} User`;

  const [formData, setFormData]: any = useState(userModalState.user);

  const [fileValue, setFileValue] = useState<File | null>(null);

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

  const handleAvatarUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];

    if (file) {
      setFileValue(file);
      setFieldValue("avatar", file);
    }
  };

  const onSubmit = async (e: any) => {
    const formDataObj = new FormData();
    // Your existing submit
    if (!isEdit) {
      formData.full_name = formData.full_name.toString();
      formData.email = formData.email.toString();
      formData.mobile = formData.mobile.toString();
      formData.password = formData.password.toString();

      formDataObj.append("full_name", formData.full_name);
      formDataObj.append("email", formData.email);
      formDataObj.append("mobile", formData.mobile);
      formDataObj.append("password", formData.password);
    } else {
      formDataObj.append("id", formData.id);
      formDataObj.append("full_name", formData.full_name);
      formDataObj.append("email", formData.email);
      formDataObj.append("mobile", formData.mobile);
      formDataObj.append("password", formData.password);
    }

    if (fileValue) {
      formDataObj.append("avatar", fileValue);
    } else {
      formDataObj.append("avatar", formData.avatar);
    }

    if (isEdit) {
      await executeSave(UserApi.updateUser(formDataObj as any));
    } else {
      await executeSave(UserApi.addUser(formDataObj as any));
    }

    refreshUsers();
    closeModal();
    toast.success(
      `User has been ${isEdit ? "updated" : "created"} successfully.`,
      {
        autoClose: 4000,
      }
    );
  };

  const validationSchema = yup.object().shape({
    full_name: yup
      .string()
      .required("Name is required")
      .test(
        "contains-non-numeric",
        "Name must contain at least one non-numeric character",
        (value) => {
          return /\D/.test(value);
        }
      ),
    email: yup.string().email().required("Email is required"),
    mobile: yup
      .mixed()
      .test("is-number", "Phone number must be a number", (value: any) => {
        return /^\d+(\.\d+)?$/.test(value);
      })
      .required("Phone number is required"),
    avatar: yup.mixed().nullable().notRequired(),
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
              show={userModalState.isOpen}
              onHide={closeModal}
              placement="end"
              style={{ width: "800px" }}
            >
              <Offcanvas.Header>
                <Offcanvas.Title>{title}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="card-body p-2 app-info-form">
                <div className="box-content">
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                      <Col>
                        <InputLabel>Name</InputLabel>
                        <Field
                          type="text"
                          placeholder="Enter name"
                          name="full_name"
                          className={`form-control ${
                            touched.full_name && errors.full_name
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.full_name}
                        />
                        <ErrorMessage
                          name="full_name"
                          component="div"
                          className="error"
                        />
                      </Col>
                      <Col>
                        <InputLabel>Email</InputLabel>
                        <Field
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.email}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <InputLabel>Phone number</InputLabel>
                        <Field
                          type="tel"
                          placeholder="Enter phone number"
                          name="mobile"
                          minLength={10} // Minimum length constraint
                          maxLength={15} // Maximum length constraint
                          className={`form-control ${
                            touched.mobile && errors.mobile ? "is-invalid" : ""
                          }`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, setFieldValue)
                          }
                          value={values.mobile}
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="error"
                        />
                      </Col>

                      <Col>
                        <InputLabel>Avatar</InputLabel>
                        <input
                          type="file"
                          accept="image/*"
                          name="avatar"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleAvatarUpload(event, setFieldValue)}
                        />
                        <ErrorMessage
                          name="avatar"
                          component="div"
                          className="error"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      {!isEdit ? (
                        <Col>
                          <InputLabel>Password</InputLabel>

                          <InputGroup className="mb-3" style={{ width: "48%" }}>
                            <Field
                              type={showPassword ? `text` : `password`}
                              name="password"
                              placeholder="Enter Password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, setFieldValue)}
                              value={values.password}
                            />
                            <InputGroup.Text
                              onClick={() => setShowPassword(!showPassword)}
                              className={
                                showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                              }
                            ></InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="error"
                          />
                        </Col>
                      ) : null}
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

export default EditUser;
