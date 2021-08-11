import { useState, FC } from "react";
import ActiveBlogPost from "../ActiveBlogPost";
import axios from "axios";
import "./BlogList.scss";
import { Blog, ActivePost } from "../../models/Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBlogPost from "../EditBlogPost";

interface BlogProps {
  blogs: Blog[];
}

const BlogList: FC<BlogProps> = ({ blogs }) => {
  const [activePost, setActivePost] = useState<ActivePost | null>(null); //' when i know the shape of the object create an interface
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const getActivePost = async (id: number) => {
    try {
      const response = await axios.get(`/blogs/${id}`);

      setActivePost(response.data);
      console.log("Successfully retrieved blog post");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAdventure = async (id) => {
    try {
      await axios.delete(`/blogs/${id}`);
      console.log("Adventure deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {activePost && <ActiveBlogPost activePost={activePost} />}
      {blogs.map((blog) => (
        <div
          onClick={() => getActivePost(blog.location_id)}
          key={blog.id}
          className='blog-list'
        >
          <h1 className='blog-list__title'>{blog.title}</h1>
          <p className='blog-list__body'>{blog.body}</p>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => {
              setEdit(true);
              setId(blog.id);
            }}
            className='adventure__edit'
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => {
              deleteAdventure(blog.id);
            }}
            className='adventure__delete'
          />
          {edit && <EditBlogPost id={id} setEdit={setEdit} />}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
