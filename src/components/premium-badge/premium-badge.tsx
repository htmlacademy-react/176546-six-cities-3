type PremiumBadgeProps = {
  text: string;
  variant?: 'place-card' | 'offer';
};

function PremiumBadge({ text, variant = 'place-card' }: PremiumBadgeProps): JSX.Element {
  const markClass = variant === 'offer' ? 'offer__mark' : 'place-card__mark';

  return (
    <div className={markClass}>
      <span>{text}</span>
    </div>
  );
}

export default PremiumBadge;
