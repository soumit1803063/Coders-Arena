import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CreateProblem from "../../components/CreateProblem/CreateProblem";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import ProblemList from "../../components/ProblemList/ProblemList";
import ShowMember from "../../components/ShowMember/ShowMember";
import ShowMemberRequest from "../../components/ShowMemberRequest/ShowMemberRequest";

const SingleGroupView = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container>
        <Row>
          <Col>
            <div>{"_/\\_"}</div>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Container>
              <Row>
                <Col md={6}>
                  <ProblemList></ProblemList>
                </Col>
                <Col md={6}>
                  <CreateProblem></CreateProblem>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={3}>
            <Row>
              <ShowMember></ShowMember>
            </Row>
            <Row>
              <ShowMemberRequest></ShowMemberRequest>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleGroupView;
