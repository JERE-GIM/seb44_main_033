export interface ISimilarMovie {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
}

export interface IGenre {
  genreId: number;
  genreName: string;
}

export interface IMovieProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
  link: string;
}

export interface IMovieVote {
  voteAverage: number;
  voteCount: number;
}

export interface IReview {
  reviewId: number;
  userId: number;
  username: string;
  movieId: number;
  movieTitle: string;
  posterPath: string;
  content: string;
  score: number;
  reviewVoted: boolean;
  votesCount: number;
  createdAt: string;
  modifiedAt: string;
}

export interface IPageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IMovieInfo {
  movieId: string;
  title: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  videoPath: string;
  releaseDate: string;
  genres: Array<IGenre>;
  certification: string;
  runtime: number;
  director: string;
  actors: Array<string>;
  movieVote: IMovieVote;
  similarMovies: Array<ISimilarMovie>;
  watchProviders: Array<IMovieProvider>;
  watchlistCheck: boolean;
}

export interface IMovieResponse {
  data: IMovieInfo;
  reviews: Array<IReview>;
  pageInfo: IPageInfo;
}
