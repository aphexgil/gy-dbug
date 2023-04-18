import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import '../App.css';

const styles = {
  header: {
    fontFamily: "Rubik Mono One, sans-serif",
    fontSize: "30px",
    textAlign: "center"
  },
  button: {
    fontFamily: "Rubik Mono One, sans-serif",
  },
};

function Home() {

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleGuestLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: "guest@dbug.com", password: "dbugguest" }
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Card body className="home-card black-text">
        <header style={styles.header}>Welcome to DBUG!</header>
        <div style={{}}>
          With DBUG, you can easily organize and manage all the issues related to any
          collaborative project. Our ticketing system allows users to document problems
          that need fixing, assign priority levels, and track progress as they are
          resolved. Create an account and get ready to DBUG!
        </div>
        <div className="login-btn-wrapper">
        <Button href="/login" variant="dark" className="login-btn">
          Log In
        </Button>
        <Button variant="light" onClick={handleGuestLogin}>
          Guest Log In
        </Button>
        </div>
      </Card>
    </>
  );
}

export default Home;
