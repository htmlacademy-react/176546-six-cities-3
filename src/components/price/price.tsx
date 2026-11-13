import { PRICE_VARIANTS } from './const';
import type { PriceVariant } from './const';

type PriceProps = {
  price: number;
  variant: PriceVariant;
};

function Price({ price, variant }: PriceProps): JSX.Element {
  const { wrapper, value, text, suffix } = PRICE_VARIANTS[variant];

  return (
    <div className={wrapper}>
      <b className={value}>&euro;{price}</b>
      <span className={text}>{suffix}</span>
    </div>
  );
}

export default Price;
