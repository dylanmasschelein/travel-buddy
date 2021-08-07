import "./Photos.scss";
import { useState, FC } from "react";
import PhotoUpload from "../PhotoUpload";

interface PhotoProps {
  location: any;
}

const Photos: FC<PhotoProps> = ({ location }) => {
  const [togglePhoto, setTogglePhoto] = useState(false);

  return (
    <div>
      <h1 className='photos'>Photos</h1>
      {/* map over photos tables to display photos here after request */}
      <button onClick={() => setTogglePhoto(!togglePhoto)}>Add Photo</button>
      {togglePhoto && <PhotoUpload location={location} />}
    </div>
  );
};

export default Photos;
