import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import NavbarComp from "../../components/NavbarComp/NavbarComp";

const SearchedGroupPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container className="pt-4">
        <Row>
          <Col md={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchedGroupPage;
