import React, { useState } from 'react';
import { BookmarkButton } from '../styles/watchlist/WatchBookMark.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';

export interface BookmarkButtonProps {
  movieId: string;
  onClick: (movieId: string) => void;
}

export const WatchBookmark: React.FC<BookmarkButtonProps> = ({
  movieId,
  onClick,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    onClick(movieId);
  };

  return (
    <BookmarkButton onClick={handleBookmarkClick}>
      <FontAwesomeIcon
        icon={isBookmarked ? faBookmarkRegular : faBookmarkSolid}
        style={{ cursor: 'pointer', fontSize: '30px' }}
      />
    </BookmarkButton>
  );
};
