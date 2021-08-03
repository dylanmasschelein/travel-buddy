import { useState, useEffect, FC } from "react";
import "./Blog.scss";
import BlogList from "../BlogList";
import Comments from "../Comments";
import BlogForm from "../BlogForm";
import axios from "axios";
import { Location } from "../../models/Location";

interface UserProps {
  user: { name: string; email: string; id: number };
  location: Location[];
}

interface Blog {
  title: string;
  body: string;
  user_id: number;
}

const Blog: FC<UserProps> = ({ user, location }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const blogPostHandler = async (
    title: string,
    body: string,
    location_id: number
  ) => {
    const data = {
      title,
      body,
      location_id,
    };

    try {
      const response = await axios.post("/blogs/", data);
      console.log("Blog post successfully added!", response);
    } catch (err) {
      console.error(err);
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(`/blogs/${location[0].id}`);

      setBlogs(response.data);
      console.log(response.data);
      console.log("Recieved and set blogs!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='blog'>
      <div className='blog__header'>
        <h1 className='blog__title'>Blog</h1>
        <span onClick={() => setToggle(!toggle)} className='blog__add'>
          +
        </span>
      </div>
      {toggle && (
        <BlogForm location={location} blogPostHandler={blogPostHandler} />
      )}
      {/* For creating a new blog post, likely will move in the future to its own page*/}
      {blogs && <BlogList blogs={blogs} />}
      {/* <Comments /> */}
    </div>
  );
};
export default Blog;
