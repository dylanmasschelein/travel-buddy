import axios from "axios";
import { FormEvent } from "react";
import { FC, useState } from "react";
import "./Login.scss";

interface UserProps {
  setUser: (user: object | null) => void;
}

const Login: FC<UserProps> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    try {
      const response = await axios.get(`/users/${email}`);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='login' onSubmit={(e) => loginHandler(e)}>
      <h1 className='login__heading'>Login</h1>
      <label htmlFor='email' className='login__label'>
        Email
        <input
          type='email'
          className='login__input'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor='password' className='login__label'>
        Password
        <input
          type='password'
          className='login__input'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type='submit' className='login__button'>
        LOGIN
      </button>
    </form>
  );
};

export default Login;
