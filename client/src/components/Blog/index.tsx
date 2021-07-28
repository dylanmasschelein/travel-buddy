import { useState, FC } from "react";
import "./Blog.scss";
import BlogList from "../BlogList";
import Comments from "../Comments";
import BlogForm from "../BlogForm";
interface UserProps {
  user: { name: string; email: string; id?: number };
}

interface Blog {
  id: number;
  title: string;
  post: string;
  likes: number;
}

const Blog: FC<UserProps> = ({ user }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const blogPostHandler = (title: string, post: string, likes: number = 0) => {
    // Probably wanna post this to db then call a get to set the blog list
    setBlogs((prevBlogs) => [
      ...prevBlogs,
      { id: Math.random(), title, post, likes },
    ]);
  };

  return (
    <div>
      <h1 className='blog'>Blog</h1>
      <span onClick={() => setToggle(!toggle)}>Add Blogpost</span>
      {toggle && <BlogForm blogPostHandler={blogPostHandler} />}
      {/* For creating a new blog post, likely will move in the future to its own page*/}
      <BlogList blogs={blogs} />
      <Comments />
    </div>
  );
};
export default Blog;
