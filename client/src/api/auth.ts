import axios from 'axios';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;
const userId = localStorage.getItem('userId')
  ? Number(localStorage.getItem('userId'))
  : null;

export const fetchDeleteAccount = async () => {
  const res = await axios.delete(
    `http://cinemaprincess.shop/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
