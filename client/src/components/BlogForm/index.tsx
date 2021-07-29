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
    <form className='blog-form' onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='title' className='blog-form__label'>
        Title
        <input
          type='text'
          className='blog-form__blog-title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor='post' className='blog-form__label'>
        Blog post
        <textarea
          className='blog-form__content'
          id='post'
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
      </label>
      <button type='submit' className='blog-form__button'>
        POST
      </button>
    </form>
  );
};

export default BlogForm;
