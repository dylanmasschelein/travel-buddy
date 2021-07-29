import React from "react";
import { useState } from "react";
import "./BlogForm.scss";

interface PostProps {
  blogPostHandler: (title: string, post: string, user_id: number) => void;
  user: {
    email: string;
    id: number;
    name: string;
  };
}

const BlogForm: React.FC<PostProps> = ({ user, blogPostHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    blogPostHandler(title, post, user.id);
    console.log(title, post, user.id);
  };

  return (
    <form className='blog__form'>
      <label htmlFor='title' className='blog__label'>
        Title
        <input
          type='text'
          className='blog__blog-title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor='post' className='blog__label'>
        Blog post
        <textarea
          className='blog__content'
          id='post'
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
      </label>
      <button onClick={(e) => handleSubmit(e)} type='submit'>
        POST
      </button>
    </form>
  );
};

export default BlogForm;
