import React, { useEffect } from "react";
import styles from "./GroupList.module.css";
import { Card, Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { getGroupsAction } from "../../action/group.action";
import { connect } from "react-redux";
import { baseUrl } from "../../constant/url";
import { useNavigate } from "react-router-dom";
//
//
const GroupList = ({ getGroupsAction, groups, user }) => {
  useEffect(() => {
    getGroupsAction();
  }, [user]);

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        {groups === null ? (
          <Spinner animation="grow" variant="dark"></Spinner>
        ) : groups.length === 0 ? (
          <h1>No group found!</h1>
        ) : (
          groups.reverse().map((item, i) => (
            <Col md={3} key={i}>
              <Card className="py-3">
                <Card.Img
                  variant="top"
                  height={200}
                  src={`${baseUrl}/image/${item.image}`}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/group/${item._id}`)}
                  >
                    View Group
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

const mapStatetoProps = (state) => ({
  groups: state.group.groups,
  user: state.auth.user,
});

export default connect(mapStatetoProps, { getGroupsAction })(GroupList);
