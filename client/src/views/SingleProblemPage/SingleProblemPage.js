import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import PostComment from "../../components/PostComment/PostComment";
import Problem from "../../components/Problem/Problem";

const SingleProblemPage = () => {
  return (
    <div>
      <NavbarComp></NavbarComp>
      <Container className="pt-4">
        <Problem></Problem>
      </Container>
      <Card>
        <Card.Header>
          <h1>Comment Section</h1>
        </Card.Header>
        <Card.Body>
          <PostComment></PostComment>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProblemPage;
