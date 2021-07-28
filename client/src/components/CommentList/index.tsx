import axios from "axios";
import { useState } from "react";
import "./CommentList.scss";

interface LikeProps {
  likeHandler: (id: string) => void;
}

interface Comment {
  id: string;
  user: string;
  timestamp: Date;
  comment: string;
}

const CommentList: React.FC<LikeProps> = ({ likeHandler }) => {
  const [comments, setComments] = useState<Comment[]>([]);
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
          <span>{comment.timestamp}</span>
          <p>{comment.comment}</p>
        </div>;
      })}
    </div>
  );
};
export default CommentList;
