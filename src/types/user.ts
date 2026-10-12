import type { HostInfo } from '@/types/host.ts';

export type User = {
  email: string;
  password: string;
};

export type AuthInfo = HostInfo & {
  email: string;
};

export type AuthInfoWithToken = AuthInfo & {
  token: string;
};
