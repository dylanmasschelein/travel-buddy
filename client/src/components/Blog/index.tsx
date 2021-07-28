import { useState } from "react";
import "./Blog.scss";
import BlogList from "../BlogList";
import Comments from "../Comments";
import BlogForm from "../BlogForm";

interface Blog {
  id: number;
  title: string;
  post: string;
  likes: number;
}

const Blog: React.FC = () => {
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
      <BlogList blogs={blogs} />
      <Comments />
    </div>
  );
};
export default Blog;
