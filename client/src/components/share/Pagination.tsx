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
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: page === current ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em 0;
  margin-top: 30px;
`;

export const PageButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5em 1em;
  margin: 0 0.25em;
  font-weight: 500;
  color: #ff5252;
`;
