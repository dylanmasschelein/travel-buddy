import { useState } from "react";
import ActiveBlogPost from "../ActiveBlogPost";
import axios from "axios";

interface BlogProps {
  blogs: { id: number; title: string; post: string; likes: number }[];
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
      const response = await axios.get(`http://localhost:8080/blog/${id}`);

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
        <div onClick={() => getActivePost(blog.id)} key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.post}</p>
          <button>
            ICON<span>{blog.likes}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
