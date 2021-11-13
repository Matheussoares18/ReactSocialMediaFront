import React, { useEffect, useState } from 'react';
import userPhoto from '../../../assets/userPhoto.png';

interface UserPictureProps {
  source?: string;
  classname?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}
export function UserPicture({
  source,
  classname,
  onMouseEnter,
  onClick,
}: UserPictureProps) {
  const [imageSource, setImageSource] = useState<string>('');

  useEffect(() => {
    if (source && source.length > 0) {
      setImageSource(source);
    } else {
      setImageSource(userPhoto);
    }
  }, [source]);
  return (
    <img
      src={imageSource}
      alt=" "
      onClick={onClick}
      onKeyPress={() => onClick}
      loading="lazy"
      role="presentation"
      style={{ objectFit: `${source ? 'cover' : 'initial'}` }}
      className={classname}
      onMouseEnter={onMouseEnter}
    />
  );
}
