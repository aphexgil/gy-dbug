import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_PROJECT } from "../utils/mutations";
import Auth from "../utils/auth";

function ProjectModal({
  projectData,
  setProjectData,
  currentUser,
  handleProjectClose,
  showProject,
}) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const projectManager = currentUser.username;

  const [addProject, { error }] = useMutation(ADD_PROJECT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProject({
        variables: {
          projectTitle,
          projectDescription,
          projectType,
          projectStatus,
          projectManager,
        },
      });
      setProjectData([data.addProject, ...projectData]);
    } catch (err) {
      console.error(err);
    }
    setProjectTitle("");
    setProjectDescription("");
    setProjectType("");
    setProjectStatus("");
    handleProjectClose();
  };

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setProjectTitle(value);
    }
    if (name === "description") {
      setProjectDescription(value);
    }
    if (name === "type") {
      setProjectType(value);
    }
    if (name === "status") {
      setProjectStatus(value);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <span className={`m-0 ${error ? "text-danger" : ""}`}>
            {error && <span className="ml-2">{error.message}</span>}
          </span>
          <Modal show={showProject} onHide={handleProjectClose} className="black-text">
            <Modal.Header closeButton>
              <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    value={projectTitle}
                    onChange={handleChange}
                    name="title"
                    type="title"
                    placeholder="Enter project title"
                  />
                  <Form.Text className="text-muted">
                    Please give your project a title.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={projectDescription}
                    onChange={handleChange}
                    name="description"
                    as="textarea"
                    rows={3}
                    type=""
                    placeholder="Project Description"
                  />
                  <Form.Text className="text-muted">
                    Please give your project a brief description.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPriority">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={projectStatus}
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
                <Form.Group className="mb-3" controlId="formBasicPriority">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={projectType}
                    onChange={handleChange}
                    name="type"
                    aria-label="Default select example"
                  >
                    <option>Select Type</option>

                    <option value="Application">Application</option>
                    <option value="Third Party">Third Party</option>
                    <option value="Feature">Feature</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleProjectClose}>
                Cancel
              </Button>
              <Button variant="dark" onClick={handleSubmit}>
                Add Project
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>
          You need to be logged in to view your projects. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
}

export default ProjectModal;
