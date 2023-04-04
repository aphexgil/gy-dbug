import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";

import { MDBIcon } from "mdb-react-ui-kit";
import Auth from "../utils/auth";

function RemoveProjectModal({ project, projects, setProjectData }) {
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);
  const handleRemove = async (project) => {
    try {
      const { data } = await removeProject({
        variables: { projectId: project._id },
      });
      const filterProjects = projects.filter(
        (project) => project._id !== data.removeProject._id
      );
      setProjectData(filterProjects);
    } catch (err) {
      console.log(err);
    }
    handleClose();
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
            <MDBIcon onClick={handleShow} far icon="trash-alt" className="icon-hover"/>
          </Link>
          {/* Content Here */}
          <Modal show={show} onHide={handleClose} class="black-text">
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure you want to remove this project?
              </Modal.Title>
            </Modal.Header>
            {/* Modal Body Content */}
            <Modal.Body>These changes can't be reverted!</Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="dark" onClick={() => handleRemove(project)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>
          You need to be logged in to view this. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
}

export default RemoveProjectModal;
