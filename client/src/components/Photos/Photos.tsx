import "./Photos.scss";
import { useState, useEffect, FC } from "react";
import PhotoUpload from "../PhotoUpload";
import axios from "axios";

interface PhotoProps {
  location: any;
}

const Photos: FC<PhotoProps> = ({ location }) => {
  const [togglePhoto, setTogglePhoto] = useState(false);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    const photoLocation = location[0].photo_location_id;
    try {
      const response = await axios.get(`/photos/${photoLocation}`);
      setPhotos(response.data);
    } catch (err) {}
  };
  return (
    <div>
      <h1 className='photos'>Photos</h1>

      {/* map over photos tables to display photos here after request */}
      <button onClick={() => setTogglePhoto(!togglePhoto)}>Add Photo</button>
      {togglePhoto && <PhotoUpload location={location} />}
      {photos.map((photo) => (
        <img src={`photos/photoPath/${photo.photo}`} alt='travel photos' />
      ))}
    </div>
  );
};

export default Photos;
