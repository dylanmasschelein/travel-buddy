import axios from "axios";
import { FC, FormEvent, useState } from "react";

const Register: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      await axios.post("/user", data);

      console.log("User Created - Front-end Msg");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='register' onSubmit={handleRegister}>
      <label htmlFor='name' className='resgister__label'>
        Name
        <input
          type='text'
          className='register__input'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor='email' className='resgister__label'>
        Email
        <input
          type='text'
          className='register__input'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor='password' className='resgister__label'>
        Password
        <input
          type='text'
          className='register__input'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>REGISTER</button>
    </form>
  );
};

export default Register;
