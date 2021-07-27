import React from "react";

interface BlogPostProps {
  blogs: { id: number; title: string; post: string }[];
}

const BlogPosts: React.FC<BlogPostProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.post}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
