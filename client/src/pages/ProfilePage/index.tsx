import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import axios from "axios";
import Blog from "../../components/Blog";
import AdventureMap from "../../components/AdventureMap";
import AdventureCard from "../../components/ActiveBlogPost";
import { useEffect } from "react";
import { loadMapApi } from "../../utils/google-maps-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface UserProps {
  user: { name: string; email: string; id: number };
}

const ProfilePage: FC<UserProps> = ({ user }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [tripCoords, setTripCoords] = useState(null);
  const [profNav, setProfNav] = useState(false);
  const [adventures, setAdventures] = useState([]);
  const [viewingAdventure, setViewingAdventure] = useState({});

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", () => {
      setScriptLoaded(false); // change to true to display map
    });
  }, []);

  const getAdventureCards = async () => {
    try {
      const response = await axios.get("/adventures/");

      setAdventures(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAdventureCards();
  }, []);

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
      {adventures.map((adventure) => (
        <AdventureCard adventure={adventure} />
      ))}
      {scriptLoaded && (
        <AdventureMap
          mapType={google.maps.MapTypeId.ROADMAP}
          mapTypeControl={true}
        />
      )}

      <Blog user={user} />
    </div>
  );
};

export default ProfilePage;
