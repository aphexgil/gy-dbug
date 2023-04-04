import { useState } from "react";
import Card from "react-bootstrap/Card";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginCard() {
  const [newUser, setNewUser] = useState(false);
  return (
    <Card className="login-card black-text">
      {newUser ? (
        <SignUpForm setUser={setNewUser} />
      ) : (
        <LoginForm setUser={setNewUser} />
      )}
    </Card>
  );
}

export default LoginCard;
