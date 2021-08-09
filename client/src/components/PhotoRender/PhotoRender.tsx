import { FC } from "react";
import "./PhotoRender.scss";

interface PhotoProp {
  photo: {
    id: number;
    photo_location_id: number;
    photo: string;
    title: string;
    caption: string;
  };
}

const PhotoRender: FC<PhotoProp> = ({ photo }) => {
  return (
    <div className='photo'>
      <h3 className='photo__title'>{photo.title}</h3>
      <p className='photo__caption'>{photo.caption}</p>
      <img src={`photos/photoPath/${photo.photo}`} alt={photo.title} />
    </div>
  );
};
export default PhotoRender;
