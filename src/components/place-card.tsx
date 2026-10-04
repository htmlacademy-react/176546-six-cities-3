import type { Offer } from '@/mocks/offers';

type PlaceCardProps = {
  offer: Offer;
  variant?: 'cities' | 'near-places';
  isActive?: boolean;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
};

function PlaceCard({
  offer,
  variant = 'cities',
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps): JSX.Element {
  const { id, isPremium, price, rating, title, type, previewImage } = offer;

  const cardClass = variant === 'cities' ? 'cities__card' : 'near-places__card';
  const imageWrapperClass =
    variant === 'cities' ? 'cities__image-wrapper' : 'near-places__image-wrapper';

  return (
    <article
      className={`${cardClass} place-card${isActive ? ' place-card--active' : ''}`}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <a href={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`/offer/${id}`}>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
