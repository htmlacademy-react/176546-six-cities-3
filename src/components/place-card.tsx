import type { OfferPreview } from '@/types/offer.ts';
import { generatePath, Link } from 'react-router-dom';
import PremiumBadge from '@/components/premium-badge';
import BookmarkButton from '@/components/bookmark-button';
import { getRatingWidth } from '@/utils';
import { AppRoute } from '@/const.ts';

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: 'cities' | 'near-places';
  onCardHover?: (id: string | null) => void;
};

function PlaceCard({ offer, variant = 'cities', onCardHover }: PlaceCardProps): JSX.Element {
  const { id, isPremium, isFavorite, price, rating, title, type, previewImage } = offer;

  const cardClass = variant === 'cities' ? 'cities__card' : 'near-places__card';
  const imageWrapperClass =
    variant === 'cities' ? 'cities__image-wrapper' : 'near-places__image-wrapper';
  const offerPath = generatePath(AppRoute.Offer, { id });

  return (
    <article
      className={`${cardClass} place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      <PremiumBadge isPremium={isPremium} />

      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkButton isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
