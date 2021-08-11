import "./ModalWindow.scss";
import { FC, useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface ModalProps {
  editAdventure: (
    e: FormEvent,
    id: number,
    title: string,
    country: string,
    stay: number,
    file: any
  ) => void;
  id: number;
}

const ModalWindow: FC<ModalProps> = ({ id, editAdventure }) => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [stay, setStay] = useState(null);
  const [file, setFile] = useState(null);

  const getAdventureData = async (id) => {
    try {
      const response = await axios.get(`/adventures/active/${id}`);
      console.log(response.data[0]);
      const { title, length_of_stay, photo, country } = response.data[0];
      setTitle(title);
      setCountry(country);
      setStay(length_of_stay);
      setFile(photo);
      console.log(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAdventureData(id);
  }, []);

  return (
    <div className='modal'>
      <div className='modal__window'>
        <form
          className='adventure-form'
          onSubmit={(e) => editAdventure(e, id, title, country, stay, file)}
        >
          <label htmlFor='title' className='adventure-form__label'>
            Title
            <input
              type='text'
              className='adventure-form__content'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor='country' className='adventure-form__label'>
            Country
            <textarea
              className='adventure-form__content'
              id='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></textarea>
          </label>
          <label htmlFor='stay' className='adventure-form__label'>
            Lenght of stay
            <textarea
              className='adventure-form__content'
              id='stay'
              value={stay}
              onChange={(e) => setStay(Number(e.target.value))}
            ></textarea>
          </label>
          <label htmlFor='photo' className='adventure-form__label'>
            Photo
            <input
              type='file'
              name='file'
              accept='image/*'
              id='photo'
              className='adventure-form__content'
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </label>
          <button type='submit' className='adventure-form__button'>
            Submit Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
