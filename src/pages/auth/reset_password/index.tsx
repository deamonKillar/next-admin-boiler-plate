import React, { useState } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import AuthApi from "@/services/authApis";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel } from "@mui/material";

const INITIAL_VALUES = {
  email: "",
  new_password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  const [formData, setFormData]: any = useState(INITIAL_VALUES);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { token } = router.query;

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

  const onSubmit = async () => {
    formData.token = token;
    const response: any = await AuthApi.resetPassword(formData);
    if (response.statusCode === 200) {
      router.push("/auth/login");
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    new_password: yup.string().required("New password is required"),
    confirm_password: yup.string().required("Confirm password is required"),
  });

  return (
    <Container style={{ maxWidth: "400px" }}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, touched, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12}>
                <InputLabel className="fs-12 font-weight-bold text-md-left">
                  Email
                </InputLabel>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter username"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setFieldValue)
                  }
                  value={values.email}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <InputLabel className="fs-12 font-weight-bold text-md-left">
                  New Password
                </InputLabel>

                <InputGroup className=" mb-1">
                  <Field
                    type={showNewPassword ? `text` : `password`}
                    name="new_password"
                    placeholder="Enter New Password"
                    className={`form-control ${
                      touched.new_password && errors.new_password
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, setFieldValue)
                    }
                    value={values.new_password}
                  />
                  <InputGroup.Text
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={
                      showNewPassword ? "fa fa-eye" : "fa fa-eye-slash"
                    }
                    style={{ height: "43px" }}
                  ></InputGroup.Text>
                </InputGroup>
                <ErrorMessage
                  name="new_password"
                  component="div"
                  className="error"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputLabel className="fs-12 font-weight-bold text-md-left">
                  Confirm Password
                </InputLabel>

                <InputGroup className=" mb-1">
                  <Field
                    type={showConfirmPassword ? `text` : `password`}
                    name="confirm_password"
                    placeholder="Enter New Password"
                    className={`form-control ${
                      touched.confirm_password && errors.confirm_password
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, setFieldValue)
                    }
                    value={values.confirm_password}
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={
                      showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"
                    }
                    style={{ height: "43px" }}
                  ></InputGroup.Text>
                </InputGroup>
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="error"
                />
              </Col>
            </Row>
            <div className="login-container mt-2">
              <Button type="submit" className="login-button">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
