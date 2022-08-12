import React from "react";
import { Container, Image, Row } from "react-bootstrap";
import NavbarComp from "../../components/NavbarComp/NavbarComp";

const LandingPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <div fluid>
        <Row>
          <Image
            height={545}
            src={"https://wallpaper.dog/large/20512806.jpg"}
            alt="Logo"
          />
        </Row>
      </div>
      ;
    </div>
  );
};

export default LandingPage;
