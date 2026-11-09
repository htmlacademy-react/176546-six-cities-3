import UserBadge from '@/components/user-badge/user-badge';
import type { HostInfo } from '@/types/host';

type OfferHostProps = {
  host: HostInfo;
  description: string;
};

function OfferHost({ host, description }: OfferHostProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <UserBadge user={host} variant="offer" />
      <div className="offer__description">
        <p className="offer__text">{description}</p>
      </div>
    </div>
  );
}

export default OfferHost;
