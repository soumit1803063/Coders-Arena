import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import { toast } from "react-toastify";
import { loginAction, registerAction } from "../../action/auth.action";
import { connect } from "react-redux";

import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ loginAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    let check = loginAction(email, password);
    if (check === true) {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <>
        <Row className="justify-content-md-center py-4">
          <Col
            xs
            md={5}
            className="border rounded font-weight-bold py-3"
            style={{ color: "#3b5998", fontWeight: "700" }}
          >
            SignIn into Coders' Arena
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={5} className="border rounded font-weight-bold pb-4">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter the password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default connect(null, { loginAction })(LoginForm);
