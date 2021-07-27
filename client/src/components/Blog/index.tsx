import { useState } from "react";
import "./Blog.scss";
import BlogPosts from "../BlogPosts";
import Form from "../Form";

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

  return (
    <div>
      <h1 className='blog'>Blog</h1>
      <Form blogPostHandler={blogPostHandler} />
      <BlogPosts blogs={blogs} />
    </div>
  );
};
export default Blog;
