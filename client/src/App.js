import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComp from "./components/NavbarComp/NavbarComp";
import PrivateOutlet from "./Utils/PrivateOutlet";
import LandingPage from "./views/LandingPage/LandingPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LoginPage from "./views/LoginPage/LoginPage";
import { useEffect } from "react";
import setAuthToken from "./Utils/setToken";
import { getAuthUserAction } from "./action/auth.action";
import { connect } from "react-redux";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import ProblemPage from "./views/ProblemPage/ProblemPage";

function App({ getAuthUserAction }) {
  useEffect(() => {
    if (localStorage.getItem("ca-token")) {
      setAuthToken(localStorage.getItem("ca-token"));
      getAuthUserAction();
    }
  }, []);
  return (
    <div className="App">
      <ToastContainer newestOnTop theme="light" />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<PrivateOutlet />}>
          <>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="group/:id" element={<ProblemPage></ProblemPage>} />
          </>
        </Route>
      </Routes>
    </div>
  );
}

export default connect(null, { getAuthUserAction })(App);
