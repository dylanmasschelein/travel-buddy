import { FC } from "react";
import "./PhotoRender.scss";
import { Photo } from "../../models/Photos";
interface PhotoProp {
  photo: Photo;
}

const PhotoRender: FC<PhotoProp> = ({ photo }) => {
  return (
    <div className='photo'>
      <h3 className='photo__title'>{photo.title}</h3>
      <p className='photo__caption'>{photo.caption}</p>
      <img
        src={`photos/photoPath/${photo.photo}`}
        alt={photo.title}
        className='photo__img'
      />
    </div>
  );
};
export default PhotoRender;
