import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { useState } from "react";

import Auth from "../utils/auth";

function SignUpForm({ setUser }) {
  const handleViewLoginCard = () => {
    setUser(false);
  };

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username"
            onChange={handleChange}
            type="text"
            placeholder="Create a username"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          onClick={handleSubmit}
          className="mb-2 mr-1"
          variant="dark"
          type="submit"
        >
          Sign up
        </Button>
        <Button
          className="mb-2 login-signup-btn"
          onClick={handleViewLoginCard}
          type="submit"
          variant="light"
        >
          Log In Instead
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpForm;
