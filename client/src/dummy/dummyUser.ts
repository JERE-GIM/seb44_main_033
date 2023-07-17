interface IUser {
  id: string;
  username: string;
  email: string;
  gender: string;
  age: string;
  profileUrl: string;
  createdAt: number;
  genres: Array<string>;
}

export const dummyUser: IUser = {
  id: '1',
  username: '소문난칠공주',
  email: 'hello@github.com',
  gender: '여자',
  age: '20대',
  profileUrl: '',
  createdAt: 1688450196434,
  genres: ['액션', 'SF'],
};
