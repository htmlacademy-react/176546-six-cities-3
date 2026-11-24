import { memo } from 'react';
import type { OfferPreview } from '@/types/offer';
import { generatePath, Link } from 'react-router-dom';
import PremiumBadge from '@/components/premium-badge';
import BookmarkButton from '@/components/bookmark-button';
import RatingStars from '@/components/rating-stars/rating-stars';
import Price from '@/components/price/price';
import { capitalize } from '@/utils';
import { AppRoute } from '@/const';
import { CARD_CLASSES, CARD_IMAGE_SIZES } from '@/components/place-card/const';
import type { PlaceCardVariant } from '@/components/place-card/const';

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: PlaceCardVariant;
  onCardHover?: (id: string | null) => void;
};

function PlaceCardView({ offer, variant = 'cities', onCardHover }: PlaceCardProps): JSX.Element {
  const { id, isPremium, price, rating, title, type, previewImage } = offer;

  const cardClasses = CARD_CLASSES[variant];
  const imageSize = CARD_IMAGE_SIZES[variant];
  const offerPath = generatePath(AppRoute.Offer, { id });

  return (
    <article
      className={`${cardClasses.card} place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      {isPremium && <PremiumBadge text="Premium" />}

      <div className={`${cardClasses.imageWrapper} place-card__image-wrapper`}>
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            loading="lazy"
            decoding="async"
            alt={title}
          />
        </Link>
      </div>
      <div className={cardClasses.info}>
        <div className="place-card__price-wrapper">
          <Price price={price} variant="place-card" />

          <BookmarkButton offerId={id} />
        </div>
        <RatingStars rating={rating} variant="place-card" />
        <h2 className="place-card__name">
          <Link to={offerPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

const PlaceCard = memo(PlaceCardView);

export default PlaceCard;
