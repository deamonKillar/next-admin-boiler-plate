import { useState } from "react";
import Image from "next/image";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { AuthValuesType, UserDataType } from "@/context/types";
import { useRouter } from "next/router";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel } from "@mui/material";
import { useAuth } from "@/common/hooks/useAuth";

const loginForm = {
  email: "",
  password: "",
  // remember_me: false,
};
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const INITIAL_VALUES = {
  id: 0,
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(loginForm);
  const [showPassword, setShowPassword] = useState(false);

  // ** States
  const auth = useAuth();
  const router = useRouter();

  const handleFogotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const onSubmit = async () => {
    auth.login(formData, () => {
      console.log("error");
    });
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

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <>
      <Container fluid className="h-100vh">
        <Row>
          <Col className="col-md-6 col-sm-12" id="login-responsive">
            <Row className="justify-content-center">
              <Col lg={6} className="mx-auto">
                <Card.Body className="pt-10">
                  <div
                    className="dropdown header-locale"
                    id="frontend-local-login"
                    style={{ marginBottom: "800px" }}
                  >
                    Welcome To Login Page
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
                      <div className="box-content">
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
                          <Row className="mb-3">
                            <Col>
                              <InputLabel className="fs-12 font-weight-bold text-md-left">
                                Password
                              </InputLabel>
                              <InputGroup>
                                <Field
                                  type={showPassword ? "text" : "password"}
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
                                    showPassword
                                      ? "fa fa-eye"
                                      : "fa fa-eye-slash"
                                  }
                                  style={{
                                    border: "1px solid #dee2e6 !important",
                                    height: "43px",
                                  }}
                                />
                              </InputGroup>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="error"
                              />
                            </Col>
                          </Row>

                          <Row>
                            <InputLabel
                              className="forgot-password-form-lebal"
                              onClick={handleFogotPassword}
                            >
                              Forgot Your Password?
                            </InputLabel>
                          </Row>
                          <div className="login-container">
                            <Button type="submit" className="login-button">
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </Card.Body>
              </Col>
            </Row>
          </Col>
          <Col
            // md={1}
            // sm={12}
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

Login.guestGuard = true;
export default Login;
