import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import GroupCreate from "../../components/GroupCreate/GroupCreate";
import GroupList from "../../components/GroupList/GroupList";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import UserInfo from "../../components/UserInfo/UserInfo";

const DashboardPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserInfo />
        </div>
        <div className="col-md-8">
          <GroupCreate></GroupCreate>
        </div>
      </div>

      <div className="row gutters-sm">
        <Card>
          <Card.Header>
            <b>Groups</b>
          </Card.Header>
          <Card.Body>
            <GroupList></GroupList>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
