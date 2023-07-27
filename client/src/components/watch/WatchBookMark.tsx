import React, { useState } from 'react';
import { BookmarkButton } from '../../styles/components/watchlist/WatchBookMark.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { fetchAddToWatchlist, fetchDeleteInWatchlist } from '../../api/movie';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MODAL_ROLE, modalAction } from '../../redux/reducers/modal';

export interface BookmarkButtonProps {
  movieId: number;
  styleProps: { fontSize: string; right: string; bottom: string };
  defaultStatus?: boolean;
}

export const WatchBookmark: React.FC<BookmarkButtonProps> = ({
  movieId,
  styleProps,
  defaultStatus,
}) => {
  const { isLogin } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [isBookmarked, setIsBookmarked] = useState(
    defaultStatus ? defaultStatus : false,
  );

  const handleBookmarkClick = () => {
    if (!isLogin.status) return dispatch(modalAction.open(MODAL_ROLE.LOGIN));
    if (!isBookmarked)
      fetchAddToWatchlist(movieId)
        .then(() => setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked))
        .catch((err) => console.log(err));
    else
      fetchDeleteInWatchlist(movieId)
        .then(() => setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked))
        .catch((err) => console.log(err));
  };

  return (
    <BookmarkButton
      $right={styleProps.right}
      $bottom={styleProps.bottom}
      onClick={handleBookmarkClick}
    >
      <FontAwesomeIcon
        icon={faBookmarkSolid}
        style={{
          cursor: 'pointer',
          fontSize: styleProps.fontSize,
          color: isBookmarked ? 'var(--purple)' : 'var(--gray-dark)',
        }}
      />
    </BookmarkButton>
  );
};
