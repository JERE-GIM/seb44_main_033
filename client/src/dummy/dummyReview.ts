export interface IReview {
  id: string;
  movieTitle: string;
  comment: string;
  writer: string;
  profileUrl: string;
  rating: number;
  likes: number;
  dislikes: number;
}

export const dummyReviews: Array<IReview> = [
  {
    id: '1',
    movieTitle: '엘리멘탈',
    comment: '마음이 따뜻해지고 영상이 너무 아름다워요.',
    writer: '소문난칠공주',
    profileUrl: './assets/profile.jpg',
    rating: 10,
    likes: 10,
    dislikes: 0,
  },
  {
    id: '2',
    movieTitle: '엘리멘탈',
    comment:
      '마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요.',
    writer: '맛있는짜장면',
    profileUrl: '../assets/profile.jpg',
    rating: 9,
    likes: 0,
    dislikes: 2,
  },
  {
    id: '3',
    movieTitle: '엘리멘탈',
    comment:
      '마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요.',
    writer: '맛있는짜장면',
    profileUrl: '../assets/profile.jpg',
    rating: 9,
    likes: 0,
    dislikes: 2,
  },
  {
    id: '4',
    movieTitle: '엘리멘탈',
    comment:
      '엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요엘리멘탈재밌어요',
    writer: '맛있는짜장면',
    profileUrl: '../assets/profile.jpg',
    rating: 9,
    likes: 0,
    dislikes: 2,
  },
  {
    id: '5',
    movieTitle: '엘리멘탈',
    comment:
      '마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요. 마음이 따뜻해지고 영상이 너무 아름다워요.',
    writer: '맛있는짜장면',
    profileUrl: '../assets/profile.jpg',
    rating: 9,
    likes: 0,
    dislikes: 2,
  },
];
