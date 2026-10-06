import type { HostInfo } from '@/types/host.ts';

export type Review = {
  id: string;
  date: string;
  user: HostInfo;
  comment: string;
  rating: number;
};

export type ReviewPost = {
  comment: string;
  rating: number;
};
