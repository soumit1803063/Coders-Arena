import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CreateProblem from "../../components/CreateProblem/CreateProblem";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import ProblemList from "../../components/ProblemList/ProblemList";

const ProblemPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container className="pt-4">
        <Row>
          <Col md={12}>
            <CreateProblem></CreateProblem>
          </Col>
        </Row>
      </Container>

      <ProblemList></ProblemList>
    </div>
  );
};

export default ProblemPage;
