import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('userId');

export const requestGetUserInfo = async () => {
  const res = await axios.get(
    `http://cinemaprincess.shop/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

interface IUpdatePasswordData {
  password: string;
  newPassword: string;
}
export const requestUpdatePassword = async (data: IUpdatePasswordData) => {
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
export const requestUpdateUserInfo = async (data: IUpdateUserInfoData) => {
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

export const requestUpdateProfile = async (data: FormData) => {
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
