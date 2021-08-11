import { FC } from "react";
import "./PhotoRender.scss";
import { Photo } from "../../models/Photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface PhotoProp {
  photo: Photo;
  id: number;
}

const PhotoRender: FC<PhotoProp> = ({ photo, id }) => {
  const deletePhoto = async () => {
    try {
      await axios.delete(`/photos/${id}`);
      console.log("Adventure deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='photo'>
      <h3 className='photo__title'>{photo.title}</h3>
      <p className='photo__caption'>{photo.caption}</p>
      <img
        src={`photos/photoPath/${photo.photo}`}
        alt={photo.title}
        className='photo__img'
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        onClick={() => deletePhoto()}
        className='modal__close'
      />
    </div>
  );
};
export default PhotoRender;
