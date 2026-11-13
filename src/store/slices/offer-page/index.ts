export {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  postCommentAction,
} from '@/store/slices/entities/offers';
export { offerPageSlice } from './offer-page-slice';
export type { OfferPageState } from './offer-page-slice';
export {
  getCommentError,
  getComments,
  getNearbyOffers,
  getOffer,
  isOfferNotFound,
  selectCommentStatus,
  selectOfferStatus,
} from './offer-page-selectors';
