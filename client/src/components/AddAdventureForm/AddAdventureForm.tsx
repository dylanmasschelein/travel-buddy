import React from "react";
import { useState, FC } from "react";
import "./AddAdventureForm.scss";
import { User } from "../../models/User";

interface Props {
  user: User;
  newAdventureHandler: (
    id: number,
    country: string,
    stay: number,
    title: string,
    file: any
  ) => void;
}

const AddAdventureForm: FC<Props> = ({ user, newAdventureHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [stay, setStay] = useState<number>(null);
  const [file, setFile] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newAdventureHandler(user.id, country, stay, title, file);
  };

  return (
    <form className='adventure-form' onSubmit={(e) => handleSubmit(e)}>
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
          onChange={(e) => setCountry(e.target.value)}
        ></textarea>
      </label>
      <label htmlFor='stay' className='adventure-form__label'>
        Lenght of stay
        <textarea
          className='adventure-form__content'
          id='stay'
          onChange={(e) => setStay(Number(e.target.value))}
        ></textarea>
      </label>
      <label htmlFor='photo' className='adventure-form__label'>
        Lenght of stay
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
        Add Advenutre
      </button>
    </form>
  );
};

export default AddAdventureForm;
