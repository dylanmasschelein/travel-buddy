import { useState, FC } from "react";
import "./Blog.scss";
import BlogList from "../BlogList";
import Comments from "../Comments";
import BlogForm from "../BlogForm";
import axios from "axios";

interface UserProps {
  user: { name: string; email: string; id: number };
}

interface Blog {
  title: string;
  body: string;
  user_id: number;
}

const Blog: FC<UserProps> = ({ user }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const blogPostHandler = async (
    title: string,
    body: string,
    user_id: number
  ) => {
    const data = {
      title,
      body,
      user_id,
    };

    try {
      await axios.post("/blogs/", data);
      console.log("Blog post successfully added!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='blog'>Blog</h1>
      <span onClick={() => setToggle(!toggle)}>Add Blogpost</span>
      {toggle && <BlogForm user={user} blogPostHandler={blogPostHandler} />}
      {/* For creating a new blog post, likely will move in the future to its own page*/}
      <BlogList blogs={blogs} />
      <Comments />
    </div>
  );
};
export default Blog;
