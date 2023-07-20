import React from 'react';
import styled from 'styled-components';
interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ total, current, onPageChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: page === current ? 'bold' : 'normal' }}
        >
          {page}
        </PageButton>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em 0;
  margin: 30px 10px 0px 0px;
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
