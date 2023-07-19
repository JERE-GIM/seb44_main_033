export interface ISimilarMovie {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
}

export interface IMovieProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
  url: string;
}

export interface IMovie {
  id: string;
  title: string;
  overview: string;
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
  ratedUsers: number;
  audience: number;
  boxOffice: number;
  similarMovies: Array<ISimilarMovie>;
  watchProviders: Array<IMovieProvider>;
}

export const dummyMovie = {
  id: '1',
  title: '엘리멘탈',
  overview: '엘리멘탈입니다. 아주 재미있습니다.',
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
  ratedUsers: 40000,
  audience: 1982492,
  boxOffice: 1,
  similarMovies: [
    {
      movieId: 631831,
      posterPath: '/AfV8M9SWczAnrKyOjusFt9iueOW.jpg',
      title: '꿈을 향해 달리다',
      releaseDate: '2023-07-20',
    },
    {
      movieId: 1114775,
      posterPath: '/sUNr6nOlGOGhpzy329TL9NUDM7p.jpg',
      title: '우리의 하루',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 995396,
      posterPath: '/rdNB3YhphjcTXlDup78Xzot3hOi.jpg',
      title: 'Sous le tapis',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 1146254,
      posterPath: '',
      title: 'Deadly DILF',
      releaseDate: '2023-07-20',
    },
    {
      movieId: 1000130,
      posterPath: '/cawhzgmFJl4bFXvFao7FM2R4uNP.jpg',
      title: 'Les meutes',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 967591,
      posterPath: '/aAKjzFs7KVWEyOJFd28sJ91Jn0s.jpg',
      title: 'Paula',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 1051674,
      posterPath: '/bTw97hDCT7bOCIDQ6fI8xku9Gt2.jpg',
      title: 'Freno & Reversa',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 1046558,
      posterPath: '/7hJP5WcQmEDYAYSBCvbiS4adR4h.jpg',
      title: 'Canary',
      releaseDate: '2023-07-19',
    },
    {
      movieId: 1128841,
      posterPath: '/n7w3oTAxbNwVVHLKI5ADQP44Fyx.jpg',
      title: "What's The Matter?",
      releaseDate: '2023-07-19',
    },
    {
      movieId: 881302,
      posterPath: '/pwkwHvdJOH7BeUj3az5XulTspXx.jpg',
      title: 'Kutukan Peti Mati',
      releaseDate: '2023-07-20',
    },
  ],
  watchProviders: [
    {
      providerId: 111,
      providerName: 'Netflix',
      logoPath: '/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg',
      url: 'https://www.netflix.com/browse',
    },
    {
      providerId: 112,
      providerName: 'Disney',
      logoPath: '/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg',
      url: 'https://www.disneyplus.com/home',
    },
  ],
};
