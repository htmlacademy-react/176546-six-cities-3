export const RATING_OPTIONS = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
];

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export type ReviewFormData = {
  rating: number;
  comment: string;
};

export const EMPTY_REVIEW: ReviewFormData = { rating: 0, comment: '' };
