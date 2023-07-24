import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchDeleteAccount = async () => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.delete(
    `http://cinemaprincess.shop/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
