import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { REMOVE_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";

function CommentList({ ticketId, comments, commentData, setCommentData, commentCreatedAt }) {


  // Function to remove comment and update state
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);

  // ICEBOX
  // Function to edit the comment
  // const editComment = (itemId, newValue) => {
  //   // Make sure that the value isn't empty
  //   if (!newValue.text) {
  //     return;
  //   }

  //   // We use the "prev" argument provided with the useState hook to map through our list of items
  //   // We then check to see if the item ID matches the id of the item that was clicked and if so, we set it to a new value
  //   setComment((prev) => {
  //     prev.map((item) => (item.id === itemId ? newValue : item));
  //   });
  // };

  return (
    <div>
      <CommentForm
        ticketId={ticketId}
        commentData={commentData}
        setCommentData={setCommentData}
      />
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          ticketId={ticketId}
          commentId={comment._id}
          commentText={comment.commentText}
          commentAuthor={comment.commentAuthor}
          commentCreatedAt={comment.createdAt}
          removeComment={removeComment}
          setCommentData={setCommentData}
          // editComment={editComment}
        />
      ))}
    </div>
  );
}

export default CommentList;
