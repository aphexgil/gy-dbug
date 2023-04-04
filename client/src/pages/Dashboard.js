import React, { useState } from "react";
import TicketTable from "../components/TicketTable";
import { useQuery } from "@apollo/client";
import { QUERY_TICKETS, QUERY_PROJECTS, QUERY_USERS } from "../utils/queries";
import TicketModal from "../components/TicketModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "../components/Spinner";
import ProtectPage from "../components/ProtectPage";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../utils/auth";
import ProjectModal from "../components/ProjectModal";
import ProjectTable from "../components/ProjectTable";

const auth = AuthService;

const styles = {
  header: {
    fontFamily: "Rubik Mono One, sans-serif",
    fontSize: "30px",
  },
  button: {
    fontFamily: "Rubik Mono One, sans-serif",
  },
};

function Dashboard({
  handleShow,
  handleClose,
  handleProjectShow,
  handleProjectClose,
  show,
  showProject,
}) {
  const { loading, data } = useQuery(QUERY_TICKETS, {
    onCompleted: () => {
      setDashData(data.tickets);
    },
  });

  const projectQuery = useQuery(QUERY_PROJECTS, {
    onCompleted: () => {
      setProjectData(projectQuery.data.projects);
    },
  });

  const usersQuery = useQuery(QUERY_USERS, {
    onCompleted: () => {
      setUserList(usersQuery.data.users);
    },
  });
  const [dashData, setDashData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [userList, setUserList] = useState([]);

  let currentUser;

  // TicketAuthor from getProfile (current user)
  if (auth.loggedIn()) {
    currentUser = auth.getProfile().data;
  }


  return (
    <>
      {auth.loggedIn() ? (
        <Container fluid className="body-container">
          <Sidebar
            handleShow={handleShow}
            handleProjectShow={handleProjectShow}
          />
          <Row>
            <Col xs={1} lg={2}>
              {" "}
            </Col>
            <Col xs={10} lg={9}>
              <Card body className="welcome-card">
                <header style={styles.header}>
                  Welcome, {currentUser.username}!
                </header>
              </Card>

              <ProjectModal
                projectData={projectData}
                setProjectData={setProjectData}
                currentUser={currentUser}
                handleProjectClose={handleProjectClose}
                showProject={showProject}
              />

              <TicketModal
                dashData={dashData}
                setDashData={setDashData}
                currentUser={currentUser}
                handleClose={handleClose}
                show={show}
                userList={userList}
              />
              {loading ? (
                <Spinner />
              ) : (
                <div>
                  <Button
                    style={styles.button}
                    variant="dark"
                    onClick={handleProjectShow}
                  >
                    Create a Project
                  </Button>
                  <div style={styles.header}>Current Projects</div>
                  <ProjectTable
                    projects={projectData}
                    setProjectData={setProjectData}
                    currentUser={currentUser}
                  />
                  <Button
                    style={styles.button}
                    variant="dark"
                    onClick={handleShow}
                  >
                    Create a Ticket
                  </Button>
                  <div style={styles.header}>Current Tickets</div>
                  <TicketTable tickets={dashData} setDashData={setDashData} currentUser={currentUser}/>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <div>
          <ProtectPage />
        </div>
      )}
    </>
  );
}

export default Dashboard;
