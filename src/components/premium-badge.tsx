type PremiumBadgeProps = {
  isPremium: boolean;
  variant?: 'place-card' | 'offer';
};

function PremiumBadge({
  isPremium,
  variant = 'place-card',
}: PremiumBadgeProps): JSX.Element | null {
  if (!isPremium) {
    return null;
  }

  const markClass = variant === 'offer' ? 'offer__mark' : 'place-card__mark';

  return (
    <div className={markClass}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumBadge;
