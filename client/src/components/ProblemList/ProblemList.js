import React, { useEffect } from "react";

import {
  Container,
  Col,
  Row,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";

import { getProblemsAllAction } from "../../action/problem.action";

const ProblemList = ({ getProblemsAllAction, problems }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getProblemsAllAction(id);
    }
  }, []);

  return (
    <Container>
      {problems === null ? (
        <Spinner animation="grow" variant="dark"></Spinner>
      ) : problems.length === 0 ? (
        <h1>No problem found</h1>
      ) : (
        <ListGroup>
          {problems.map((item, k) => (
            <ListGroup.Item key={k}>
              <span className="d-block  text-primary pt-2">{item.name}</span>
              <span className="d-block pb-1 ">
                {item.tag.map((t, i) => (
                  <Badge key={i} className="mx-1">
                    {t}
                  </Badge>
                ))}
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

const mapStatetoProps = (state) => ({
  problems: state.problem.problems,
});

export default connect(mapStatetoProps, { getProblemsAllAction })(ProblemList);
