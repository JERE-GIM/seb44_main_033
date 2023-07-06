export interface IMovie {
  id: string;
  title: string;
  coverUrl: string;
  posterUrl: string;
  openAt: number;
  genres: Array<string>;
  nation: string;
  age: string;
  runningTime: number;
  director: string;
  actors: Array<string>;
  averageRating: number;
  audience: number;
  boxOffice: number;
}

export const dummyMovie = {
  id: '1',
  title: '엘리멘탈',
  coverUrl: './assets/elemental_cover.png',
  posterUrl: './assets/elemental_poster.png',
  openAt: 1688450196434,
  genres: ['애니메이션', '모험', '판타지', 'SF'],
  nation: '미국',
  age: '전체',
  runningTime: 109,
  director: '피터 손',
  actors: ['레아 루이스', '마무두 애시', '웬디 맥렌던'],
  averageRating: 8.7,
  audience: 1982492,
  boxOffice: 1,
};
