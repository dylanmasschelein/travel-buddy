import "./Photos.scss";
import { useState, FC } from "react";
import PhotoUpload from "../PhotoUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import PhotoRender from "../PhotoRender";

interface PhotoProps {
  location: any;
  photos: any;
}

const Photos: FC<PhotoProps> = ({ location, photos }) => {
  const [togglePhoto, setTogglePhoto] = useState(false);

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
