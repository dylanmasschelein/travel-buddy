import { useState } from "react";
import "./Blog.scss";
import BlogPosts from "../BlogPosts";
import Comments from "../Comments";
import Form from "../Form";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  post: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const blogPostHandler = (title: string, post: string) => {
    setBlogs((prevBlogs) => [
      ...prevBlogs,
      { id: Math.random(), title: title, post: post },
    ]);
  };
  console.log(blogs);

  // Can this be put in PostComments instead but still Rerender Comment List
  const commentHandler = async (comment: string) => {
    try {
      await axios.get(`http://localhost:8080/blog/${comment}`);
      console.log("Successfully posted comment!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='blog'>Blog</h1>
      <Form blogPostHandler={blogPostHandler} />
      <BlogPosts blogs={blogs} />
      <Comments commentHandler={commentHandler} />
    </div>
  );
};
export default Blog;
