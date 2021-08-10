import { useState, useEffect, FC } from "react";
import "./Blog.scss";
import BlogList from "../BlogList";
import BlogForm from "../BlogForm";
import axios from "axios";
import CommentForm from "../CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Location } from "../../models/Location";

interface UserProps {
  user: { name: string; email: string; id: number };
  location: Location[];
  blogs: Blog[];
}
interface Blog {
  title: string;
  body: string;
  location_id: number;
  id: number;
}

const Blogs: FC<UserProps> = ({ location, blogs }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [render, setRender] = useState(true);

  const blogPostHandler = async (
    title: string,
    body: string,
    location_id: number
  ) => {
    const data = {
      title,
      body,
      location_id,
    };

    try {
      const response = await axios.post("/blogs/", data);
      console.log("Blog post successfully added!", response);
      setRender(!render);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='blog'>
      <div className='blog__header'>
        <h1 className='blog__title'>
          Journal Entries
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={() => setToggle(!toggle)}
            className='blog__add'
          />
        </h1>
      </div>
      {toggle && (
        <BlogForm location={location} blogPostHandler={blogPostHandler} />
      )}
      {blogs && <BlogList blogs={blogs} />}
      {/* <Comments /> */}
    </div>
  );
};
export default Blogs;
