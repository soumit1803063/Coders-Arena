import styles from "./ShowMemberRequest.module.css";
import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Spinner,
  ListGroup,
  Badge,
  Card,
  Button,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { ScrollArea, Title } from "@mantine/core";
import { connect } from "react-redux";

import {
  ShowMemberRequestAction,
  acceptMemberRequest,
} from "../../action/member.action";
import { baseUrl } from "../../constant/url";
import moment from "moment";
import Moment from "react-moment";
//
//
//
const ShowMemberRequest = ({
  ShowMemberRequestAction,
  member_requests,
  acceptMemberRequest,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      ShowMemberRequestAction(id);
    }
  }, [id]);

  //
  //
  const handleClick = (event, user_id) => {
    acceptMemberRequest(id, user_id);
  };
  return (
    <div>
      <Card>
        <Card.Header style={{ background: "#2a9d8f", color: "#FFFFFF" }}>
          Member-Requests
        </Card.Header>
        <Card.Body style={{ background: "#e9c46a" }}>
          {member_requests === null ? (
            <Spinner animation="grow" variant="dark"></Spinner>
          ) : member_requests.length === 0 ? (
            <h5></h5>
          ) : (
            <ListGroup>
              <ScrollArea style={{ height: 200 }}>
                <div>
                  {member_requests.map((item, k) => (
                    <ListGroup.Item key={k}>
                      <Card>
                        <Card.Header
                          style={{ background: "blue", color: "white" }}
                        >
                          <b>{item.name}</b>
                        </Card.Header>
                        <Card.Text>
                          <i>{item.email}</i>
                        </Card.Text>
                        <Card.Footer>
                          <Button
                            onClick={(event) => handleClick(event, item._id)}
                          >
                            Accept
                          </Button>
                        </Card.Footer>
                      </Card>
                    </ListGroup.Item>
                  ))}
                </div>
              </ScrollArea>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  member_requests: state.member.member_requests,
});

export default connect(mapStatetoProps, {
  ShowMemberRequestAction,
  acceptMemberRequest,
})(ShowMemberRequest);
