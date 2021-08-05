import React from "react";
import { useState, FC } from "react";
import "./AddAdventureForm.scss";

interface Props {
  user: { name: string; email: string; id: number };
  newAdventureHandler: (
    id: number,
    country: string,
    stay: number,
    title: string
  ) => void;
}

const AddAdventureForm: FC<Props> = ({ user, newAdventureHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [stay, setStay] = useState<number>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newAdventureHandler(user.id, country, stay, title);
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
      <button type='submit' className='adventure-form__button'>
        Add Advenutre
      </button>
    </form>
  );
};

export default AddAdventureForm;