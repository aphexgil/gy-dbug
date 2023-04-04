import Table from "react-bootstrap/Table";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import EditProjectModal from "./EditProjectModal";
import RemoveProjectModal from "./RemoveProjectModal";

function ProjectTable({ projects, setProjectData, currentUser }) {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>
  }

  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Project Title</th>
          <th>Project Manager</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {projects &&
          projects.map((project, i) => (
            <tr key={i}>
              <td>{project.projectTitle}</td>
              <td>{project.projectManager}</td>
              <td>{project.projectType}</td>
              <td>{project.projectStatus}</td>
              <td className="dashboard-table-links">
                <Link to={`/viewproject/${project._id}`}>
                  {" "}
                <MDBIcon fas icon="eye" className="icon-hover"/>{" "}
                </Link>
                {currentUser.username===project.projectManager ? (
                <>
                  <EditProjectModal
                    // project={project}
                    projectId={project._id}
                    projects={projects}
                    setProjectData={setProjectData}
                  />
                  <RemoveProjectModal
                    project={project}
                    projects={projects}
                    setProjectData={setProjectData}
                  />
                </>
                ) : (
                  <>
                    <Link variant="light" className="disabled-link">
                      <MDBIcon fas icon="pencil-alt" color="muted"/>
                    </Link>
                    <Link variant="light" className="disabled-link">
                      <MDBIcon far icon="trash-alt" color="muted"/>
                    </Link> 
                  </>
                )
              }
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default ProjectTable;
