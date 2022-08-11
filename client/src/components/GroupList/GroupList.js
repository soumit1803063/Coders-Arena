import React, { useEffect } from "react";
import styles from "./GroupList.module.css";
import { Card, Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { getGroupsAction } from "../../action/group.action";
import { connect } from "react-redux";
import { baseUrl } from "../../constant/url";
import { useNavigate } from "react-router-dom";
//
//
const GroupList = ({ getGroupsAction, groups }) => {
  useEffect(() => {
    getGroupsAction();
  }, []);

  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        {groups === null ? (
          <Spinner animation="grow" variant="dark"></Spinner>
        ) : (
          groups.reverse().map((item, i) => (
            <Col md={3} key={i}>
              <Card className="py-3">
                <Card.Img
                  variant="top"
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
});

export default connect(mapStatetoProps, { getGroupsAction })(GroupList);
