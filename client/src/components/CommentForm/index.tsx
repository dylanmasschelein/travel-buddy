import { useState } from "react";
import "./CommentForm.scss";

interface CommentProps {
  commentHandler: (comment: string) => void;
}

const CommentForm: React.FC<CommentProps> = ({ commentHandler }) => {
  const [comment, setComment] = useState<string>("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    commentHandler(comment);
  };
  return (
    <form className='comment'>
      <label htmlFor='comment' className='comment__label'>
        Comment
        <input
          type='text'
          className='comment__comment'
          id='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button onClick={(e) => submitHandler(e)}>POST COMMENT</button>
    </form>
  );
};

export default CommentForm;
