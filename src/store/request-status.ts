import { RequestStatus } from './types';

export const isPending = (status: RequestStatus): boolean =>
  status === RequestStatus.Idle || status === RequestStatus.Loading;

export const isInFlight = (status: RequestStatus): boolean => status === RequestStatus.Loading;

export const isFailed = (status: RequestStatus): boolean => status === RequestStatus.Failed;
