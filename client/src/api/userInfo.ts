import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchGetUserInfo = async () => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchGetProfileImage = async () => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.get<Blob>(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/edit/${userId}/upload`,
    { responseType: 'blob', headers: { Authorization: accessToken } },
  );
  return res.data;
};

interface IUpdatePasswordData {
  password: string;
  newPassword: string;
}
export const fetchUpdatePassword = async (data: IUpdatePasswordData) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/edit/pw/${userId}`,
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
  const [accessToken, userId] = getAccessTokenAndUserId();
  console.log('***', data);
  const res = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/edit/${userId}`,
    data,
    {
      headers: { Authorization: accessToken },
    },
  );

  return res;
};

export const fetchUpdateProfileImage = async (data: FormData) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/mypage/edit/${userId}/upload`,
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
