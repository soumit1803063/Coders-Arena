import React, { useEffect } from "react";

import {
  Container,
  Col,
  Row,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { connect } from "react-redux";

import { getProblemsAllAction } from "../../action/problem.action";
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
    <Container
      style={{
        backgroundColor: "#171a0b",
      }}
    >
      <h3
        class="text-center mb-5"
        style={{
          color: "#FFFFFF",
        }}
      >
        Problems
      </h3>

      {problems === null ? (
        <Spinner animation="grow" variant="dark"></Spinner>
      ) : problems.length === 0 ? (
        <h1>No problem found!</h1>
      ) : (
        <ListGroup>
          {problems.map((item, k) => (
            <ListGroup.Item key={k}>
              <div class="card mb-3">
                <div class="card-body">
                  <div class="d-flex flex-column flex-lg-row">
                    <span class="avatar avatar-text rounded-3 me-4 mb-2">
                      {k}
                    </span>
                    <div class="row flex-fill">
                      <div class="col-sm-5">
                        <h4 class="h5">
                          <Link
                            to={`/problem/single/${id}/${item._id}`}
                            className="d-block  text-primary pt-2"
                          >
                            {item.name}
                          </Link>
                        </h4>
                      </div>
                      <div class="col-sm-4 py-2">
                        {item.tag.map((t, i) => (
                          <span class="badge bg-secondary">{t}</span>
                        ))}
                      </div>
                      <div class="col-sm-3 text-lg-end">
                        <Link
                          to={`/problem/single/${id}/${item._id}`}
                          class="btn btn-primary stretched-link"
                        >
                          Enter
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
