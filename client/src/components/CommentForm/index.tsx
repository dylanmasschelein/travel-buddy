import { useState, FC, FormEvent } from "react";
import "./CommentForm.scss";

interface CommentProps {
  commentHandler: (comment: string) => void;
}

const CommentForm: FC<CommentProps> = ({ commentHandler }) => {
  const [comment, setComment] = useState<string>("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    commentHandler(comment);
  };
  return (
    <form className='comment' onSubmit={(e) => submitHandler(e)}>
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
      <button type='submit' className='comment__button'>
        POST COMMENT
      </button>
    </form>
  );
};

export default CommentForm;
