import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchDeleteAccount = async () => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
