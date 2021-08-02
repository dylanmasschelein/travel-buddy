import axios from "axios";
import { FC, FormEvent, useState } from "react";
import "./Register.scss";

const Register: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      await axios.post("/users/", data);

      console.log("User Created - Front-end Msg");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='register' onSubmit={(e) => handleRegister(e)}>
      <h1 className='register__header'>Register</h1>
      <label htmlFor='name' className='register__label'>
        Name
        <input
          type='text'
          className='register__input'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor='email' className='register__label'>
        Email
        <input
          type='text'
          className='register__input'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor='password' className='register__label'>
        Password
        <input
          type='text'
          className='register__input'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type='submit' className='register__button'>
        REGISTER
      </button>
    </form>
  );
};

export default Register;
