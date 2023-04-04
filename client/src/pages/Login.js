import React from "react";
import LoginCard from "../components/LoginCard.js";
import Container from "react-bootstrap/Container";
// import background from "../images/BackgroundLog.jpg";

const Login = () => {
  return (
    <div>
      <Container className="display-flex">
        <LoginCard />
      </Container>
    </div>
  );
};

export default Login;
