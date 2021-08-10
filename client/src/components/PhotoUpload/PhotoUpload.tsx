import axios from "axios";
import { FormEvent } from "react";
import { FC, useState } from "react";
import "./PhotoUpload.scss";
import { Location } from "../../models/Location";

interface Props {
  location: Location[];
}

const PhotoUpload: FC<Props> = ({ location }) => {
  const [file, setFile] = useState<any>("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const photoUploadHandler = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", file);
    data.append("title", title);
    data.append("caption", caption);

    try {
      const response = await axios.post(`/photos/${location[0].id}`, data);
      console.log(response);
      console.log("successfully uploaded photo");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className='photo-form'>
        <label htmlFor='file' className='photo-form__label'>
          Upload New Photo
          <input
            type='file'
            name='file'
            id='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            className='photo-form__upload'
          />
        </label>
        <label htmlFor='title' className='photo-form__label'>
          Title
          <input
            type='text'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            className='photo-form__input'
          />
        </label>
        <label htmlFor='caption' className='photo-form__label'>
          Caption
          <input
            type='text'
            id='caption'
            onChange={(e) => setCaption(e.target.value)}
            className='photo-form__input'
          />
        </label>
        <button onClick={photoUploadHandler} className='photo-form__button'>
          Submit photo
        </button>
      </form>
    </>
  );
};
export default PhotoUpload;
