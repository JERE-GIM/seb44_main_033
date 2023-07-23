export const getAccessTokenAndUserId = () => {
  return [
    localStorage.getItem('accessToken') || null,
    Number(localStorage.getItem('userId')) || null,
  ];
};
