import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./UserInfo.module.css";

const UserInfo = ({ user }) => {
  return (
    <div>
      <Card className="p-4 mt-3 shadow">
        <Card.Body>
          <h4>Name : {user?.name}</h4>

          <h4>Email : {user?.email}</h4>
        </Card.Body>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, null)(UserInfo);
