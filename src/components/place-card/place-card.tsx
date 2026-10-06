import type { OfferPreview } from '@/types/offer.ts';
import { generatePath, Link } from 'react-router-dom';
import PremiumBadge from '@/components/premium-badge';
import BookmarkButton from '@/components/bookmark-button';
import { getRatingWidth } from '@/utils';
import { AppRoute } from '@/const.ts';
import { CARD_CLASSES, CARD_IMAGE_SIZES } from '@/components/place-card/const.ts';
import type { PlaceCardVariant } from '@/components/place-card/const.ts';

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: PlaceCardVariant;
  onCardHover?: (id: string | null) => void;
};

function PlaceCard({ offer, variant = 'cities', onCardHover }: PlaceCardProps): JSX.Element {
  const { id, isPremium, isFavorite, price, rating, title, type, previewImage } = offer;

  const cardClasses = CARD_CLASSES[variant];
  const imageSize = CARD_IMAGE_SIZES[variant];
  const offerPath = generatePath(AppRoute.Offer, { id });

  return (
    <article
      className={`${cardClasses.card} place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      <PremiumBadge isPremium={isPremium} />

      <div className={`${cardClasses.imageWrapper} place-card__image-wrapper`}>
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={title}
          />
        </Link>
      </div>
      <div className={cardClasses.info}>
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
