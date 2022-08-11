import React, { useEffect } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Problem.module.css";
import { getSingleProblemAction } from "../../action/problem.action";
import { baseUrl } from "../../constant/url";

const Problem = ({ getSingleProblemAction, singleProblem }) => {
  const { group_id, problem_id } = useParams();
  useEffect(() => {
    console.log("hello ");
    if (group_id && problem_id) {
      getSingleProblemAction(group_id, problem_id);
    }
  }, [problem_id]);

  const navigate = useNavigate();

  console.log(singleProblem);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>{singleProblem?.name}</h1>
          <hr></hr>
          <div className="border py-2">
            <a href={singleProblem?.link}>{singleProblem?.link}</a>
          </div>
          <div>
            <span className="d-block pb-1 ">
              {singleProblem?.tag.map((t, i) => (
                <Badge key={i} className="mx-1">
                  {t}
                </Badge>
              ))}
            </span>
          </div>
        </Col>
      </Row>
      <Row></Row>

      <Row>
        <Col md={12}>
          <Card className="py-3">
            <Card.Img
              variant="top"
              src={`${baseUrl}/image/${singleProblem?.image}`}
            />
          </Card>
          <Card.Body>
            <Card.Text>{singleProblem?.description}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

const mapStatetoProps = (state) => ({
  singleProblem: state.problem.selected_problem,
});

export default connect(mapStatetoProps, { getSingleProblemAction })(Problem);
