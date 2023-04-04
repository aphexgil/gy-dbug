import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PROJECT, QUERY_USERS } from "../utils/queries";
import Spinner from "../components/Spinner";
import ProtectPage from "../components/ProtectPage";
import ProjectModal from "../components/ProjectModal";
import TicketModal from "../components/TicketModal";
import { useEffect, useState } from "react";
import ProjectTickets from  "../components/ProjectTickets";
import AuthService from "../utils/auth";
import ProjectTicketModal from "../components/ProjectTicketModal";
import Button from "react-bootstrap/Button";
// ICEBOXED COMMENT LIST
// import CommentList from "../components/CommentList";
// import ProjectTable from "../components/ProjectTable";

const styles = {
  header: {
    fontFamily: "Rubik Mono One, sans-serif",
    fontSize: "30px",
  },
  button: {
    fontFamily: "Rubik Mono One, sans-serif",
  },
};

const auth = AuthService;

const ViewProject = ({
  handleClose,
  handleShow,
  show,
  handleProjectShow,
  handleProjectClose,
  showProject,
}) => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const project = data?.project || [];

  const [showProjectTicket, setShowProjectTicket] = useState(false);
  const handleProjectTicketClose = () => setShowProjectTicket(false);
  const handleProjectTicketShow = () => setShowProjectTicket(true);

  const usersQuery = useQuery(QUERY_USERS, {
    onCompleted: () => {
      setUserList(usersQuery.data.users);
    },
  });
  const [userList, setUserList] = useState([]);

  // Date formatters for createdAt and updatedAt
  const createdAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(project.createdAt);
  const updatedAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(project.updatedAt);

  const [projectTicketDash, setProjectTicketDash] = useState([]);

  const [dashData, setDashData] = useState([]);

  const currentUser = auth.getProfile().data;

  useEffect(() => {
    if(project.tickets){
      setProjectTicketDash(project.tickets);
    }
  }, [project?.tickets]);

// {project.projectTitle}, {createdAt}, {updatedAt}


  console.log(userList);
  return (
    <>
      {auth.loggedIn() ? (
        loading ? (
          <Spinner />
        ) : (
          <Container fluid className="body-container">
            <Sidebar
              handleShow={handleShow}
              handleProjectShow={handleProjectShow}
            />
            <Row>
              <Col xs={1} lg={3}>
                {" "}
              </Col>
              <Col xs={10} lg={8}>
                <Card className="text-center project-detail-card">
                  <Card.Header className="project-detail-header">
                    <Card.Title className="project-detail-title">
                      {project.projectTitle}
                    </Card.Title>
                    <Card.Text>Manager: {project.projectManager}</Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <>
                      <Card.Text className="project-detail-description">
                        {project.projectDescription}
                      </Card.Text>
                      <div className="project-detail-flair">
                        <Card.Text className="project-detail-status">
                          {project.projectStatus}
                        </Card.Text>
                      </div>
                    </>

                  
                </Card.Body>
                <Card.Footer className="text-muted"></Card.Footer>
              </Card>
              <Button
                    style={styles.button}
                    variant="dark"
                    onClick={handleProjectTicketShow}
                  >
                    Create a Ticket for this project
                  </Button>
              <ProjectTicketModal handleClose={handleProjectTicketClose} show={showProjectTicket} projectId={projectId} currentUser={currentUser} projectTicketDash={projectTicketDash} setProjectTicketDash={setProjectTicketDash} userList={userList}/>

              <ProjectTickets project={project} currentUser={currentUser} projectTicketDash={projectTicketDash} setProjectTicketDash={setProjectTicketDash}/>
                      {/* ICEBOX */}
              {/* <CommentList /> */}

              </Col>
            </Row>
            <TicketModal
              dashData={dashData}
              setDashData={setDashData}
              currentUser={currentUser}
              handleClose={handleClose}
              show={show}
              userList={userList}
            />
            <ProjectModal
              projectData={dashData}
              setProjectData={setDashData}
              currentUser={currentUser}
              handleProjectClose={handleProjectClose}
              showProject={showProject}
            />
          </Container>
        )
      ) : (
        <div>
          <ProtectPage />
        </div>
      )}
    </>
  );
};

export default ViewProject;
