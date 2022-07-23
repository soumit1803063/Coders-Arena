import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import styles from "./RegisterForm.module.css";
import { toast } from "react-toastify";
import { registerAction } from "../../action/auth.action";
import { connect } from "react-redux";

const RegisterForm = ({ registerAction }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    registerAction(name, email, password);
  };
  return (
    <>
      <Row className="justify-content-md-center py-4">
        <Col
          xs
          md={5}
          className="border rounded font-weight-bold py-3"
          style={{ color: "#3b5998", fontWeight: "700" }}
        >
          SignUp into Coders' Arena
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5} className="border rounded font-weight-bold pb-4">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default connect(null, { registerAction })(RegisterForm);
