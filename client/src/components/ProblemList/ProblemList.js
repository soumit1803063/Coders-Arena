import React, { useEffect } from "react";

import {
  Container,
  Col,
  Row,
  Spinner,
  ListGroup,
  Badge,
  Card,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { connect } from "react-redux";

import { getProblemsAllAction } from "../../action/problem.action";
import { ScrollArea } from "@mantine/core";
//
//
//problem list
const ProblemList = ({ getProblemsAllAction, problems }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getProblemsAllAction(id);
    }
  }, [id]);

  return (
    <Card
      style={{
        backgroundColor: "#2a9d8f",
      }}
    >
      <Card.Header
        class="text-center mb-5"
        style={{
          color: "#FFFFFF",
        }}
      >
        Problems
      </Card.Header>

      {problems === null ? (
        <Spinner animation="grow" variant="dark"></Spinner>
      ) : problems.length === 0 ? (
        <h1>No problem found!</h1>
      ) : (
        <ListGroup>
          <ScrollArea style={{ height: 500 }}>
            {problems.map((item, k) => (
              <ListGroup.Item key={k}>
                <Card>
                  <Card.Header>
                    <h4>
                      <Link
                        to={`/problem/single/${id}/${item._id}`}
                        className="d-block  text-primary pt-2"
                      >
                        {item.name}
                      </Link>
                    </h4>
                  </Card.Header>
                  <Card.Footer style={{ background: "#FFFFFF" }}>
                    {item.tag.map((t, i) => (
                      <span class="badge bg-secondary">{t}</span>
                    ))}
                  </Card.Footer>
                </Card>
              </ListGroup.Item>
            ))}
          </ScrollArea>
        </ListGroup>
      )}
    </Card>
  );
};

const mapStatetoProps = (state) => ({
  problems: state.problem.problems,
});

export default connect(mapStatetoProps, { getProblemsAllAction })(ProblemList);
