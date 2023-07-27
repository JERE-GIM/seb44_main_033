import React from 'react';
import {
  PageButton,
  PaginationWrapper,
} from '../../styles/components/share/Pagination.styled';

interface Props {
  total: number;
  current: number;
  onPageClick: (page: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pagination: React.FC<Props> = ({
  total,
  current,
  onPageClick,
  onPrevClick,
  onNextClick,
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      <PageButton onClick={onPrevClick}>이전</PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageClick(page)}
          style={{ fontWeight: page === current ? 'bold' : 'normal' }}
        >
          {page}
        </PageButton>
      ))}
      <PageButton onClick={onNextClick}>다음</PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
