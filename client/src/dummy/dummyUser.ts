interface IUser {
  id: string;
  username: string;
  profileUrl: string;
  createdAt: number;
  genres: Array<string>;
}

export const dummyUser: IUser = {
  id: '1',
  username: '소문난칠공주',
  profileUrl: '',
  createdAt: 1688450196434,
  genres: ['액션', 'SF'],
};
