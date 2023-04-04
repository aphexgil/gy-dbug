import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_TICKET, QUERY_USERS } from "../utils/queries";
import Spinner from "../components/Spinner";
import ProtectPage from "../components/ProtectPage";
import TicketModal from "../components/TicketModal";
import ProjectModal from "../components/ProjectModal";
import { useEffect, useState } from "react";

import AuthService from "../utils/auth";
import CommentList from "../components/CommentList";

const auth = AuthService;

const ViewTicket = ({
  show,
  handleShow,
  handleClose,
  showProject,
  handleProjectShow,
  handleProjectClose,
}) => {
  const [dashData, setDashData] = useState([]);

  const [projectData, setProjectData] = useState([]);

  const [commentData, setCommentData] = useState([]);
  
  const { ticketId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TICKET, {
    variables: { ticketId },
    onCompleted: () => {
      setCommentData(data.ticket.comments);
    },
  });

  const ticket = data?.ticket || [];

  const usersQuery = useQuery(QUERY_USERS, {
    onCompleted: () => {
      setUserList(usersQuery.data.users);
    },
  });
  const [userList, setUserList] = useState([]);

  // Date formatters for CreatedAt and updatedAt
  const ticketCreatedAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(ticket.createdAt);

  const updatedAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(ticket.updatedAt);

  // state variable for comment button collapse
  // const [open, setOpen] = useState(false);

  // current user data to send to Ticket Modal
  const currentUser = auth.getProfile().data;

  const [flairColor, setFlairColor] = useState("grey");

  let styles = {
    backgroundColor: flairColor,
  };

  useEffect(() => {
    if (ticket?.ticketPriority === "Low") {
      setFlairColor("#a5db95");
    } else if (ticket?.ticketPriority === "Medium") {
      setFlairColor("#f7f374");
    } else if (ticket?.ticketPriority === "High") {
      setFlairColor("#e88e82");
    } else {
      setFlairColor("#f288d6");
    }
  }, [ticket?.ticketPriority]);

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
                <Card className="text-center ticket-detail-card">
                  <Card.Header className="ticket-detail-header">
                    <div className="ticket-detail-header-left">
                      <Card.Title className="ticket-detail-title">
                        {ticket.ticketTitle}
                      </Card.Title>
                      <div className="ticket-detail-type">
                        {ticket.ticketType}
                      </div>
                    </div>
                    <Card.Text className="ticket-detail-submission">
                      <div>Submitted by {ticket.ticketAuthor}</div>
                      <div>Assigned to {ticket.ticketAssignee}</div>
                    </Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="ticket-detail-description">
                      {ticket.ticketDescription}
                    </Card.Text>
                    <div className="ticket-detail-flair">
                      <Card.Text className="ticket-detail-status">
                        {ticket.ticketStatus}
                      </Card.Text>
                      <Card.Text
                        className="ticket-detail-priority"
                        style={styles}
                      >
                        {ticket.ticketPriority} Priority
                      </Card.Text>
                    </div>
                  </Card.Body>
                  <Card.Footer className="ticket-detail-footer">
                    {ticketCreatedAt.split(", ")[0]} [
                    {ticketCreatedAt.split(", ")[1].slice(0, 5)}
                    {ticketCreatedAt.split(", ")[1].slice(8)}]<br></br>
                    {updatedAt === ticketCreatedAt
                      ? ""
                      : `  (Updated ${updatedAt.split(", ")[0]} [${updatedAt
                          .split(", ")[1]
                          .slice(0, 5)}${updatedAt.split(", ")[1].slice(8)}])`}
                  </Card.Footer>
                </Card>
                <CommentList
                  ticketId={ticketId}
                  comments={commentData}
                  setCommentData={setCommentData}
                />
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
              projectData={projectData}
              setProjectData={setProjectData}
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

export default ViewTicket;
