import React, { useState } from "react";
import Image from "next/image";
import { Breadcrumb, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import AuthApi from "@/services/authApis";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_VALUES = {
  email: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const router = useRouter();
  const LoginPage = () => {
    router.push("/auth/login");
  };

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
    await AuthApi.forgotPassword(formData as any)
      .then(() => {
        router.push("/verify-email");
      })
      .catch(() => {
        toast.error("Invalid credintial", { autoClose: 4000 });
      });
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  return (
    <>
      <Container fluid className="h-100vh">
        <Row>
          <Col className="col-md-6 col-sm-10">
            <Row className="justify-content-left">
              <Col lg={6} className="mx-auto">
                <Card.Body className="pt-10">
                  <div
                    className="dropdown header-locale"
                    id="frontend-local-login"
                    style={{ marginBottom: "800px" }}
                  >
                    Welcome To Forgot Password
                  </div>
                  <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({
                      handleSubmit,
                      values,
                      touched,
                      errors,
                      setFieldValue,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="center-container">
                          <Row className="mb-3">
                            <Col>
                              <InputLabel className="fs-12 font-weight-bold text-md-left">
                                Email Address
                              </InputLabel>
                              <Field
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                className={`form-control ${
                                  touched.email && errors.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, setFieldValue)}
                                value={values.email}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                              />
                            </Col>
                          </Row>

                          <div className="login-container">
                            <Button
                              type="submit"
                              className="forgot-password-btn"
                            >
                              Email Password Reset Link
                            </Button>
                          </div>
                          <InputLabel
                            className="mr-1"
                            style={{ textAlign: "center" }}
                          >
                            or
                          </InputLabel>
                          <InputLabel
                            className="forgot-password-form-lebal"
                            style={{ textAlign: "center" }}
                            onClick={LoginPage}
                          >
                            Sign In
                          </InputLabel>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Col>
            </Row>
          </Col>
          <Col
            className="text-center background-special align-middle p-0"
            id="login-background"
          >
            <div className="login-bg">
              <img
                src="https://aibuddy-4.webheaydemo.com/img/frontend/backgrounds/login.webp"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

ForgotPassword.guestGuard = true;
export default ForgotPassword;
