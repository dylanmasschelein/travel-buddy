import axios from "axios";
import { useState } from "react";
import "./CommentList.scss";

interface LikeProps {
  likeHandler: (id: string) => void;
}

interface Comment {
  id: string;
  user: string;
  published: Date;
  comment: string;
  likes: number;
}

const CommentList: React.FC<LikeProps> = ({ likeHandler }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // This needs to render on load of blog/profile page unless i add a dropdown for this??
  // -- on second thought, might be nice to have the option to hide comment section...
  const getComments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/blog/comments");

      setComments(response.data);

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='comment-list'>
      <h1 className='comment-list__title'>Comments....</h1>
      {comments.map((comment) => {
        <div key={comment.id}>
          <span>{comment.user}</span>
          <span>{comment.published}</span>
          <p>{comment.comment}</p>
          <button onClick={() => likeHandler(comment.id)}>
            Icon<span>{comment.likes}</span>
          </button>
        </div>;
      })}
    </div>
  );
};
export default CommentList;
