import styled from 'styled-components';
import React from 'react';

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

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em 0;
  margin: 30px 0px 0px 0px;
`;

export const PageButton = styled.button`
  background: transparent;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.5em 1em;
  margin: 0 0.25em;
  font-weight: 500;
`;
