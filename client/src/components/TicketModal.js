import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_TICKET } from "../utils/mutations";
import Auth from "../utils/auth";

function TicketModal({
  dashData,
  setDashData,
  currentUser,
  handleClose,
  show,
  userList
}) {

  const [ticketTitle, setTitle] = useState("");
  const [ticketDescription, setDescription] = useState("");
  const [ticketType, setType] = useState("");
  const [ticketPriority, setPriority] = useState("");
  const [ticketStatus, setStatus] = useState("");
  const [ticketAssignee, setAssignee] = useState("");
  const ticketAuthor = currentUser.username;

  const [addTicket, { error }] = useMutation(ADD_TICKET);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addTicket({
        variables: {
          ticketTitle,
          ticketDescription,
          ticketType,
          ticketStatus,
          ticketPriority,
          ticketAuthor,
          ticketAssignee,
        },
      });
      setDashData([data.addTicket, ...dashData]);
    } catch (err) {
      console.error(err);
    }
    setTitle("");
    setDescription("");
    setType("");
    setPriority("");
    setStatus("");
    setAssignee("");
    handleClose();
  };

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "description") {
      setDescription(value);
    }
    if (name === "type") {
      setType(value);
    }
    if (name === "priority") {
      setPriority(value);
    }
    if (name === "status") {
      setStatus(value);
    }
    if (name === "assignee") {
      setAssignee(value);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <span className={`m-0 ${error ? "text-danger" : ""}`}>
            {error && <span className="ml-2">{error.message}</span>}
          </span>
          <Modal show={show} onHide={handleClose} className="black-text">
            <Modal.Header closeButton>
              <Modal.Title>New Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={ticketTitle}
                    onChange={handleChange}
                    name="title"
                    type="title"
                    placeholder="Enter ticket title"
                  />
                  <Form.Text className="text-muted">
                    Please give your ticket a title.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={ticketDescription}
                    onChange={handleChange}
                    name="description"
                    as="textarea"
                    rows={3}
                    type=""
                    placeholder="Ticket Description"
                  />
                  <Form.Text className="text-muted">
                    Please give your ticket a brief description.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicStatus">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={ticketType}
                    onChange={handleChange}
                    name="type"
                    aria-label="Default select example"
                  >
                    <option>Select Type</option>
                    <option value="New Feature">New Feature</option>
                    <option value="Bug">Bug</option>
                    <option value="Task">Task</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Epic">Epic</option>
                    <option value="Story">Story</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicType">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={ticketPriority}
                    onChange={handleChange}
                    name="priority"
                    aria-label="Default select example"
                  >
                    <option>Select Priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPriority">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={ticketStatus}
                    onChange={handleChange}
                    name="status"
                    aria-label="Default select example"
                  >
                    <option>Select Status</option>
                    <option value="New">New</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Unassigned">Unassigned</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Archived">Archived</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAssignee">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    value={ticketAssignee}
                    onChange={handleChange}
                    name="assignee"
                    aria-label="Default select example"
                  >
                    <option></option>
                    {userList && userList.map((user) => (
                      <option key={user._id} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="dark" onClick={handleSubmit}>
                Submit ticket
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>
          You need to be logged in to view your tickets. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
}

export default TicketModal;
