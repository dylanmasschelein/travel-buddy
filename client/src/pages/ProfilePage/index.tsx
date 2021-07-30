import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import Blog from "../../components/Blog";
import AdventureMap from "../../components/AdventureMap";
import { useEffect } from "react";
import { loadMapApi } from "../../utils/google-maps-config";

interface UserProps {
  user: { name: string; email: string; id: number };
}

const ProfilePage: FC<UserProps> = ({ user }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", () => {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div>
      <Link to='/profile/blog'>Blog</Link>
      <Link to='/profile/recommendations'>Recommendations</Link>
      <Link to='/profile/photos'>Photos</Link>
      <Link to='/profile/map'>Adventure map</Link>
      <Link to='/profile/bucketlist'>Bucket list</Link>
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
