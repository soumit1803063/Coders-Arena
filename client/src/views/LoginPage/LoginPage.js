import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import NavbarComp from "../../components/NavbarComp/NavbarComp";

const LoginPage = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      // navigate dashboard
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div>
      <NavbarComp />
      <Container>
        <LoginForm></LoginForm>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(LoginPage);
