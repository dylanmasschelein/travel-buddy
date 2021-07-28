import React from "react";
import { useState } from "react";
import "./BlogForm.scss";

interface PostProps {
  blogPostHandler: (title: string, post: string) => void;
}

const BlogForm: React.FC<PostProps> = ({ blogPostHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    blogPostHandler(title, post);
    console.log(title, post);
  };

  return (
    <form className='blog__form'>
      <label htmlFor='title' className='blog__label'>
        Title
        <input
          type='text'
          className='blog__content'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor='post' className='blog__label'>
        Blog post
        <input
          type='text'
          className='blog__content'
          id='post'
          onChange={(e) => setPost(e.target.value)}
        />
      </label>
      <button onClick={(e) => handleSubmit(e)} type='submit'>
        POST
      </button>
    </form>
  );
};

export default BlogForm;
