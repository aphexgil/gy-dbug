import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import "../App.css";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import auth from "../utils/auth";

function CommentForm(props) {
  // addComment mutation
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // commentText variables for form
  const [commentText, setCommentText] = useState("");

  // current user data (if logged in)
  let commentAuthor;
  let commentAuthorId;

  if (auth.loggedIn()) {
     commentAuthor = auth.getProfile().data.username;
     commentAuthorId = auth.getProfile().data._id;
  }


  const ticketId = props.ticketId;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          ticketId,
          commentText,
          commentAuthor,
        },
      });

      props.setCommentData(data.addComment.comments)
    } catch (err) {
      console.error(err);
    }
    setCommentText("");
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  // TODO: FIGURE OUT IF WE WANT COLLAPSE (CURRENTLY COMMENTED OUT)
  // state variable for comment button collapse
  // const [open, setOpen] = useState(false);

  // First we check to see if "edit" prop exists. If not, we render the normal form
  // If the prop "edit" exists, we know to render the update form instead
  return !props.edit ? (
    <>
      {/* <Button
                  variant="outline-dark" 
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    Add a comment
                  </Button>
                  <div id="example-collapse-text">
                  <Collapse in={open} dimension="width"> */}
      <div className="comment-card">
        <Form className="comment-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Add a comment"
              value={commentText}
              name="text"
              className="comment-input"
              onChange={handleChange}
            />

            <Button
              onClick={handleSubmit}
              className="comment-button"
              variant="dark"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
      {/* </Collapse>
    </div> */}
    </>
  ) : (
    <div>
      <h3>Update comment: {props.edit.value}</h3>
      <Form className="edit-comment-form comment-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="text"
            placeholder={props.edit.value}
            value={commentText}
            name="text"
            className="comment-input"
            onChange={handleChange}
          />
          {/* <div className="dropdown">
          <div className="dropdown-content"></div>
        </div> */}
          <Button
            onClick={handleSubmit}
            variant="outline-dark"
            className="comment-button"
          >
            Update
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CommentForm;
