import React from "react";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";
import "./Comments.scss";
import axios from "axios";

const Comments: React.FC = () => {
  // Can this be put in PostComments instead but still Rerender Comment List
  const commentHandler = async (comment: string) => {
    try {
      await axios.post(`http://localhost:8080/blog/${comment}`);
      console.log("Successfully posted comment!");
    } catch (err) {
      console.error(err);
    }
  };

  const likeHandler = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/blog/${id}`);
      console.log("Successfully liked comment!");
      // Do something to UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CommentForm commentHandler={commentHandler} />
      <CommentList likeHandler={likeHandler} />
    </>
  );
};
export default Comments;
