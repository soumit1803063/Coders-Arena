import React from "react";
import { Card, Image } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./UserInfo.module.css";

const UserInfo = ({ user }) => {
  return (
    <div className="p-4 mt-3 shadow">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <Image
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="USER_NAME"
              className="rounded-circle"
              width="150"
            ></Image>
            <div className="mt-3">
              <h4>{user?.name}</h4>
              <p className="text-secondary mb-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, null)(UserInfo);
