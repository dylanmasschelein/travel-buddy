import "./Header.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className='header'>
      <h1 className='header__name'>Travel-Buddy</h1>
      <nav className='header__nav'>
        <Link to='/' className='header__link'>
          Home
        </Link>
        <Link to='/profile' className='header__link'>
          Profile
        </Link>
        <Link to='/login' className='header__link'>
          Login
        </Link>
        <Link to='/register' className='header__link'>
          Register
        </Link>
      </nav>
    </div>
  );
};

export default Header;
