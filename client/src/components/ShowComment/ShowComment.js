import React, { useEffect, useState } from "react";
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
import { ScrollArea, Title } from "@mantine/core";
import { connect } from "react-redux";
import styles from "./ShowComment.module.css";
import { getCommentsAction } from "../../action/comment.action";
import { baseUrl } from "../../constant/url";
import moment from "moment";
import Moment from "react-moment";
//
//

const ShowComment = ({ getCommentsAction, comments }) => {
  const { group_id, problem_id } = useParams();
  useEffect(() => {
    if (problem_id) {
      getCommentsAction(problem_id);
    }
  }, [problem_id]);

  //
  //

  return (
    <Container>
      <Title className="p-3 mb-2 bg-secondary text-white">Comments:</Title>
      {comments === null ? (
        <Spinner animation="grow" variant="dark"></Spinner>
      ) : comments.length === 0 ? (
        <h5>No comment found!</h5>
      ) : (
        <ListGroup>
          <ScrollArea style={{ height: 500 }}>
            <div>
              {comments[0].map((item, k) => (
                <ListGroup.Item key={k}>
                  <Card>
                    <Card.Header>
                      <Row>
                        <Col md={7}>
                          <b>{comments[1][0][item.sender_id]}</b>
                        </Col>
                        <Col md={5}>
                          <Moment format="MMMM Do YYYY, h:mm:ss a">
                            {item.date}
                          </Moment>
                        </Col>
                      </Row>
                    </Card.Header>

                    <Card.Img
                      variant="top"
                      src={
                        item.commentImage
                          ? `${baseUrl}/image/${item.commentImage}`
                          : null
                      }
                      style={
                        item.commentImage
                          ? { width: "18rem", height: "18rem" }
                          : { width: "0rem", height: "0rem" }
                      }
                    />
                    <Card.Body>
                      <div
                        style={{
                          float: "left",
                        }}
                      >
                        <p>{item.commentText}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </div>
          </ScrollArea>
        </ListGroup>
      )}
    </Container>
  );
};

const mapStatetoProps = (state) => ({
  comments: state.comment.comments,
});

export default connect(mapStatetoProps, { getCommentsAction })(ShowComment);
