import "./EditAdventure.scss";
import { FC, useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setEdit: (n: boolean) => void;
  id: number;
  edit: boolean;
}

const EditAdventure: FC<Props> = ({ edit, setEdit, id }) => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [stay, setStay] = useState(null);

  const getAdventureData = async (id) => {
    try {
      const response = await axios.get(`/adventures/active/${id}`);
      console.log(response.data[0]);
      const { title, length_of_stay, country } = response.data[0];
      setTitle(title);
      setCountry(country);
      setStay(length_of_stay);
      console.log(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAdventureData(id);
  }, [edit]);

  const editAdventure = async (e) => {
    e.preventDefault();
    const data = {
      title,
      country,
      stay,
    };
    try {
      await axios.put(`/adventures/${id}`, data);
      setEdit(false);
      console.log("Updated adventure!");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='modal'>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => setEdit(false)}
        className='modal__close'
      />
      <div className='modal__window'>
        <form className='adventure-form' onSubmit={(e) => editAdventure(e)}>
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
          <button type='submit' className='adventure-form__button'>
            Submit Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdventure;
