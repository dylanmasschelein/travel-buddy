import { useState, FC } from "react";
import ActiveBlogPost from "../ActiveBlogPost";
import axios from "axios";
import "./BlogList.scss";
import { Blog, ActivePost } from "../../models/Blog";

interface BlogProps {
  blogs: Blog[];
}

const BlogList: FC<BlogProps> = ({ blogs }) => {
  const [activePost, setActivePost] = useState<ActivePost | null>(null); //' when i know the shape of the object create an interface

  const getActivePost = async (id: number) => {
    try {
      const response = await axios.get(`/blogs/${id}`);

      setActivePost(response.data);
      console.log("Successfully retrieved blog post");
    } catch (err) {
      console.error(err);
    }
  };
  // onClick of a blog post, auto scroll to top and and display the active post
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
        </div>
      ))}
    </div>
  );
};

export default BlogList;
