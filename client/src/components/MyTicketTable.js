import Table from "react-bootstrap/Table";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import EditTicketModal from "./EditTicketModal";
import RemoveTicketModal from "./RemoveTicketModal";

function MyTicketTable({ tickets, setDashData, currentUser }) {
  if (!tickets.length) {
    return <h3>No Tickets Yet</h3>;
  }
  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Title</th>
          <th>Submitter</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tickets &&
          tickets.map((ticket, i) => (
            <tr key={i}>
              {currentUser.username === ticket.ticketAuthor ? (
                <>
                  <td>{ticket.ticketTitle}</td>
                  <td>{ticket.ticketAuthor}</td>
                  <td>{ticket.ticketType}</td>
                  <td>{ticket.ticketPriority}</td>
                  <td>{ticket.ticketStatus}</td>
                  <td>{ticket.ticketAssignee}</td>
                  <td className="dashboard-table-links">
                    <Link to={`/viewticket/${ticket._id}`}>
                      {" "}
                      <MDBIcon fas icon="eye" className="icon-hover" />{" "}
                    </Link>

                    <>
                      <EditTicketModal
                        ticketId={ticket._id}
                        tickets={tickets}
                        setDashData={setDashData}
                      />
                      <RemoveTicketModal
                        ticket={ticket}
                        tickets={tickets}
                        setDashData={setDashData}
                      />
                    </>
                  </td>
                </>
              ) : (
                <></>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default MyTicketTable;
