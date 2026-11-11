import Price from '@/components/price/price';
import { capitalize } from '@/utils';
import type { OfferDetails } from '@/types/offer';

type OfferInfoProps = {
  offer: OfferDetails;
};

function OfferInfo({ offer }: OfferInfoProps): JSX.Element {
  return (
    <>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{capitalize(offer.type)}</li>
        <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
        <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
      </ul>

      <Price price={offer.price} variant="offer" />

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {offer.goods.map((good) => (
            <li className="offer__inside-item" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OfferInfo;
