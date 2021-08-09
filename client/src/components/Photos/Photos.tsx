import "./Photos.scss";
import { useState, useEffect, FC } from "react";
import PhotoUpload from "../PhotoUpload";
import axios from "axios";
import PhotoRender from "../PhotoRender";

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
    const photoLocation = location[0].id;
    console.log(photoLocation);

    try {
      const response = await axios.get(`/photos/${photoLocation}`);
      setPhotos(response.data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='photos'>Photos</h1>

      {/* map over photos tables to display photos here after request */}
      <button onClick={() => setTogglePhoto(!togglePhoto)}>Add Photo</button>
      {togglePhoto && <PhotoUpload location={location} />}
      {/* {photos.length > 0 ? (
        photos.map((photo) => <PhotoRender key={photo.id} photo={photo} />)
      ) : (
        <h3>No photos</h3>
      )} */}
      {photos &&
        photos.map((photo) => <PhotoRender key={photo.id} photo={photo} />)}
    </div>
  );
};

export default Photos;
