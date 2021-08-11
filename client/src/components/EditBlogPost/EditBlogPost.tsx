import { FC, useState, useEffect } from "react";
import axios from "axios";
import "./EditBlogPost.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setEdit: (n: boolean) => void;
  id: number;
}

const EditBlogPost: FC<Props> = ({ id, setEdit }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const getBlogData = async (id) => {
    try {
      const response = await axios.get(`/blogs/active/${id}`);
      console.log(response.data);
      const { title, body } = response.data[0];
      setTitle(title);
      setPost(body);
      console.log("Recieved and set existing post values");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogData(id);
  }, []);

  const editBlogPost = async (e) => {
    e.preventDefault();
    const data = {
      title,
      post,
    };
    try {
      await axios.put(`/adventures/${id}`, data);
      setEdit(false);
      console.log("Updated Blog post!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='modal'>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => setEdit(false)}
        className='modal__close'
      />
      <div className='modal__window'>
        <form className='blog-form' onSubmit={(e) => editBlogPost(e)}>
          <label htmlFor='title' className='blog-form__label'>
            Title
            <input
              type='text'
              className='blog-form__blog-title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor='post' className='blog-form__label'>
            Blog post
            <textarea
              className='blog-form__content'
              id='post'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
          </label>
          <button type='submit' className='blog-form__button'>
            POST
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditBlogPost;
