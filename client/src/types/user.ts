import { IPageInfo, IReview } from './movie';

export interface IUserInfo {
  userId: number;
  username: string;
  email: string;
  gender: string | null;
  age: number | null;
  profileImgName: string | null;
  profileImgPath: string | null;
  createdAt: string;
  modifiedAt: string;
  genre: Array<string>;
  provider: 'LOCAL' | 'KAKAO' | 'NAVER';
}

export interface IMypageResponse {
  data: IUserInfo;
  reviews: Array<IReview>;
  pageInfo: IPageInfo;
}
