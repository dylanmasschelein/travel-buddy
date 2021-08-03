import React from "react";
import { useState } from "react";
import "./BlogForm.scss";
import { Location } from "../../models/Location";

interface PostProps {
  blogPostHandler: (title: string, post: string, user_id: number) => void;
  location: Location[];
}

const BlogForm: React.FC<PostProps> = ({ location, blogPostHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    blogPostHandler(title, post, location[0].id);
    console.log(title, post, location[0].id);
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
