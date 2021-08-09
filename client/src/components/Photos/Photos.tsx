import "./Photos.scss";
import { useState, useEffect, FC } from "react";
import PhotoUpload from "../PhotoUpload";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {}, [photos]);

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
    <div className='photos'>
      <h1 className='photos__title'>
        Photos
        <FontAwesomeIcon
          icon={faPlusCircle}
          onClick={() => setTogglePhoto(!togglePhoto)}
          className='photos__add'
        />
      </h1>
      {togglePhoto && <PhotoUpload location={location} />}

      <div className='photos__container'>
        {photos &&
          photos.map((photo) => <PhotoRender key={photo.id} photo={photo} />)}
      </div>
    </div>
  );
};

export default Photos;
