import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FcPrivacy } from "react-icons/fc";

import { useDispatch } from "react-redux";
import { signUp, signIn } from "../../actions/auth";
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

const validationScheme = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Password is too short - should be 4 chars minimum.")
    .required("Required"),
});

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    if (isSignUp) {
      dispatch(signUp(values, navigate));
    } else {
      dispatch(signIn(values, navigate));
    }
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <>
      <Container>
        <Row className="">
          <Col></Col>
          <Col md="auto">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="form-card text-center mt-4">
                  <FcPrivacy className="mb-3" size={100} />
                  <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                  {isSignUp && (
                    <>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          name="firstName"
                          type="text"
                          className={`form-control ${
                            touched.firstName && errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="firstName"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          name="lastName"
                          type="text"
                          className={`form-control ${
                            touched.lastName && errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="lastName"
                          className="invalid-feedback"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  {isSignUp && (
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={`form-control ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="confirmPassword"
                        className="invalid-feedback"
                      />
                    </div>
                  )}
                  <Button
                    className="purchase m-2"
                    variant="primary"
                    type="submit"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                  <Button variant="" onClick={switchMode}>
                    {isSignUp
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Auth;
