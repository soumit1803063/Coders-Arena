import React, { useEffect } from "react";
import styles from "./ShowSearchedGroups.module.css";
import { ShowsearchGroupAction } from "../../action/group.action";
import { sendRequestAction } from "../../action/member.action";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { baseUrl } from "../../constant/url";
import { connect } from "react-redux";
const ShowSearchedGroups = ({
  ShowsearchGroupAction,
  sendRequestAction,
  searched_groups,
}) => {
  const { groupName } = useParams();
  useEffect(() => {
    if (groupName) {
      ShowsearchGroupAction(groupName);
    }
  }, []);
  const handleClick = (event, group_id) => {
    sendRequestAction(group_id);
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <b>Search Result</b>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              {searched_groups === null ? (
                <Spinner animation="grow" variant="dark"></Spinner>
              ) : (
                searched_groups.map((item, i) => (
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
                          onClick={(event) => handleClick(event, item._id)}
                        >
                          Request
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  searched_groups: state.group.searched_groups,
});

export default connect(mapStatetoProps, {
  ShowsearchGroupAction,
  sendRequestAction,
})(ShowSearchedGroups);
