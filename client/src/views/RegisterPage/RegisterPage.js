import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ user }) => {
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
        <RegisterForm></RegisterForm>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(RegisterPage);
