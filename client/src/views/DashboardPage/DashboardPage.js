import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GroupCreate from "../../components/GroupCreate/GroupCreate";
import GroupList from "../../components/GroupList/GroupList";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import UserInfo from "../../components/UserInfo/UserInfo";

const DashboardPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container>
        <Row>
          <Col md={5}>
            <UserInfo />
          </Col>
          <Col md={7}>
            <GroupCreate></GroupCreate>
          </Col>
        </Row>
      </Container>
      <GroupList></GroupList>
    </div>
  );
};

export default DashboardPage;
