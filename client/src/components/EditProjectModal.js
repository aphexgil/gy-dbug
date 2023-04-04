import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { UPDATE_PROJECT } from "../utils/mutations";
import Auth from "../utils/auth";

function EditProjectModal({ projectId, projects, setProjectData }) {
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  useEffect(() => {
    if (data?.project) {
      setProjectTitle(data.project.projectTitle);
      setProjectDescription(data.project.projectDescription);
      setProjectType(data.project.projectType);
      setProjectStatus(data.project.projectStatus);
    }
  }, [data?.project]);

  useEffect(() => {

  }, [projectTitle, projectDescription, projectType, projectStatus]);

  const [updateProject, { error }] = useMutation(UPDATE_PROJECT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateProject({
        variables: {
          projectId,
          projectTitle,
          projectDescription,
          projectType,
          projectStatus,
        },
      });

      const updatedProjects = projects.map((project) => {
        if (project._id == data.updateProject._id) {
          return data.updateProject;
        } else {
          return project;
        }
      });
      setProjectData(updatedProjects);
    } catch (err) {
      console.error(err);
    }

    handleClose();
  };

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

  // modal variable states
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <span className={`m-0 ${error ? "text-danger" : ""}`}>
            {error && <span className="ml-2">{error.message}</span>}
          </span>
          <Link>
            <MDBIcon onClick={handleShow} fas icon="pencil-alt" className="icon-hover"/>
          </Link>

          <Modal show={show} onHide={handleClose} className="black-text">
            <Modal.Header closeButton>
              <Modal.Title>Edit Project</Modal.Title>
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
              <Button variant="dark" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="dark" onClick={handleSubmit}>
                Submit Project
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

export default EditProjectModal;
