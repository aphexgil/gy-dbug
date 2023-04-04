import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import EditTicketModal from "./EditTicketModal";
import RemoveTicketModal from "./RemoveTicketModal";
import "../App.css";


function ProjectTickets({project, currentUser, projectTicketDash, setProjectTicketDash}) {
  // if (!tickets.length) {
  //   return <h3>No Tickets Yet</h3>;
  // }


  const projectTickets = projectTicketDash;
  
  return (
    <>
      <Card className="project-ticket-table">
        <Card>
          <header className="project-ticket-header">Tickets for '{project.projectTitle}'</header>
        </Card>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Title</th>
              <th>Submitter</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {projectTickets &&
          projectTickets.map((projectTicket, i) => (
            <tr key={i}>
              <td>{projectTicket.ticketTitle}</td>
              <td>{projectTicket.ticketAuthor}</td>
              <td>{projectTicket.ticketType}</td>
              <td>{projectTicket.ticketPriority}</td>
              <td>{projectTicket.ticketStatus}</td>
              <td className="dashboard-table-links">
                <Link to={`/viewticket/${projectTicket._id}`}>
                  {" "}
                  <MDBIcon fas icon="eye" />{" "}
                </Link>
                {currentUser.username===projectTicket.ticketAuthor ? (
                <>
                  <EditTicketModal
                    ticketId={projectTicket._id}
                    tickets={projectTicketDash}
                    setDashData={setProjectTicketDash}
                  />
                  <RemoveTicketModal
                    ticket={projectTicket}
                    tickets={projectTicketDash}
                    setDashData={setProjectTicketDash}
                  />
                </>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default ProjectTickets;
