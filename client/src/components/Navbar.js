import Nav from "react-bootstrap/Nav";
import AuthService from "../utils/auth";

const auth = AuthService;

function Navbar() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/mytickets">My Tickets</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/messages">Message Center</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {/* need to link <LoginForm/> ? */}
        <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
