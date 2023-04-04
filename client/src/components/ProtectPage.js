import protect from "./assets/turn-around-gif.gif";
import { Link } from "react-router-dom";

function ProtectPage() {
  return (
    <>
      <img
        src={protect}
        alt="turn around!"
        style={{ width: "1000", margin: "auto", display: "block" }}
      />
      <p
        style={{
          textAlign: "center",
          display: "block",
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Hey! Where do you think you're going?!
      </p>{" "}
      <Link to="/" style={{ textAlign: "center", display: "block" }}>
        Login
      </Link>{" "}
      <p style={{ textAlign: "center", display: "block", marginBottom: 0 }}>
        or
      </p>{" "}
      <Link to="/" style={{ textAlign: "center", display: "block" }}>
        Signup.
      </Link>
    </>
  );
}

export default ProtectPage;
