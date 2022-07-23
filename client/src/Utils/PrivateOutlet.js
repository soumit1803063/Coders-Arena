import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthUserAction } from "../action/auth.action";
// import { authUserAction } from "../actions/Auth.action";

const PrivateOutlet = ({ auth, getAuthUserAction }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const refFunc = async () => {
      if (auth === null || auth === false) {
        let check = await getAuthUserAction();
        if (check === true) {
          return <Outlet />;
        } else {
          navigate("/");
        }
      }
    };
    refFunc();
  }, [auth, getAuthUserAction]);
  return auth === null ? <Outlet /> : auth === true ? <Outlet /> : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAuthUserAction })(PrivateOutlet);
