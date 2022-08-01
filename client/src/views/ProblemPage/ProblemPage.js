import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import ProblemList from "../../components/ProblemList/ProblemList";
import UserInfo from "../../components/UserInfo/UserInfo";

const ProblemPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container className="pt-4">
        <Row>
          <Col md={12}>{/* <GroupCreate></GroupCreate> */}</Col>
        </Row>
      </Container>

      <ProblemList></ProblemList>
    </div>
  );
};

export default ProblemPage;
