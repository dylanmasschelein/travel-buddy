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
    try {
      const response = await axios.get(`/users/${email}`);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className='login' onSubmit={loginHandler}>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          className='login__input'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          type='password'
          className='login__input'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </form>
  );
};

export default Login;
