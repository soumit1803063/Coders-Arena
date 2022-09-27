import styles from "./ShowMember.module.css";
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
  ShowMemberAction,
  rejectMemberRequest,
} from "../../action/member.action";
import { baseUrl } from "../../constant/url";
import moment from "moment";
import Moment from "react-moment";
//
//
//
const ShowMember = ({ ShowMemberAction, rejectMemberRequest, members }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      ShowMemberAction(id);
    }
  }, [id]);

  //
  //
  const rejectMember = (event, user_id) => {
    rejectMemberRequest(id, user_id);
  };
  return (
    <div>
      <Card>
        <Card.Header style={{ background: "#2a9d8f", color: "#FFFFFF" }}>
          Member
        </Card.Header>
        <Card.Body style={{ background: "#e9c46a" }}>
          {members === null ? (
            <Spinner animation="grow" variant="dark"></Spinner>
          ) : members.length === 0 ? (
            <h5></h5>
          ) : (
            <ListGroup>
              <ScrollArea style={{ height: 300 }}>
                <div>
                  {members.map((item, k) => (
                    <ListGroup.Item key={k}>
                      <Card>
                        <Card.Header
                          style={{ background: "green", color: "white" }}
                        >
                          <b>{item.name}</b>
                        </Card.Header>
                        <Card.Text>
                          <i>{item.email}</i>
                        </Card.Text>
                        <Button
                          onClick={(event) => rejectMember(event, item._id)}
                        >
                          Remove
                        </Button>
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
  members: state.member.members,
});

export default connect(mapStatetoProps, {
  ShowMemberAction,
  rejectMemberRequest,
})(ShowMember);
