import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import Adventures from "../../components/Adventures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserProps } from "../../models/User";

const ProfilePage: FC<UserProps> = ({ user }) => {
  const [profNav, setProfNav] = useState(false);

  return (
    <div className='profile'>
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setProfNav(!profNav)}
        className='profile__bars'
      />
      {profNav && (
        <nav className='profile__nav'>
          <Link to='/profile/blog' className='profile__link'>
            Blog
          </Link>
          <Link to='/profile/recommendations' className='profile__link'>
            Recommendations
          </Link>
          <Link to='/profile/photos' className='profile__link'>
            Photos
          </Link>
          <Link to='/profile/map' className='profile__link'>
            Adventure map
          </Link>
          <Link to='/profile/bucketlist' className='profile__link'>
            Bucket list
          </Link>
        </nav>
      )}

      <Adventures user={user} />
    </div>
  );
};

export default ProfilePage;
