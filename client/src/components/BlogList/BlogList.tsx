import { useState } from "react";
import ActiveBlogPost from "../ActiveBlogPost";
import axios from "axios";

interface BlogProps {
  blogs: { title: string; body: string; location_id: number; id: number }[];
}

interface ActivePost {
  title: string;
  timestamp: Date;
  author: string;
  article: string;
  likes: number;
}

const BlogList: React.FC<BlogProps> = ({ blogs }) => {
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
        <div onClick={() => getActivePost(blog.location_id)} key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
