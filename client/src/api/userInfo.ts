import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('userId');

export const fetchGetUserInfo = async () => {
  const res = await axios.get(
    `http://cinemaprincess.shop/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchGetProfileImage = async () => {
  const res = await axios.get<Blob>(
    `http://cinemaprincess.shop/users/mypage/edit/${userId}/upload`,
    { responseType: 'blob', headers: { Authorization: accessToken } },
  );
  return res.data;
};

interface IUpdatePasswordData {
  password: string;
  newPassword: string;
}
export const fetchUpdatePassword = async (data: IUpdatePasswordData) => {
  const res = await axios.patch(
    `http://cinemaprincess.shop/users/mypage/edit/pw/${userId}`,
    data,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

interface IUpdateUserInfoData {
  username: string;
  age: number | null;
  genre: Array<string>;
}
export const fetchUpdateUserInfo = async (data: IUpdateUserInfoData) => {
  console.log('***', data);
  const res = await axios.patch(
    `http://cinemaprincess.shop/users/mypage/edit/${userId}`,
    data,
    {
      headers: { Authorization: accessToken },
    },
  );

  return res;
};

export const fetchUpdateProfileImage = async (data: FormData) => {
  const res = await axios.post(
    `http://cinemaprincess.shop/users/mypage/edit/${userId}/upload`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    },
  );
  return res;
};
