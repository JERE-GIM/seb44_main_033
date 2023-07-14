import styled from 'styled-components';
import WatchDrop from '../components/watch/WatchDrop';

const Base = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

export default function Watchlist() {
  return (
    <>
      <Base>
        <WatchDrop />
      </Base>
    </>
  );
}
