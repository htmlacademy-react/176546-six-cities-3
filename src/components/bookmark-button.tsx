type BookmarkButtonProps = {
  isFavorite: boolean;
  variant?: 'place-card' | 'offer';
};

function BookmarkButton({ isFavorite, variant = 'place-card' }: BookmarkButtonProps): JSX.Element {
  const buttonClass =
    variant === 'offer' ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  const iconClass = variant === 'offer' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const iconWidth = variant === 'offer' ? 31 : 18;
  const iconHeight = variant === 'offer' ? 33 : 19;

  return (
    <button
      className={`${buttonClass} button${isFavorite ? ` ${buttonClass}--active` : ''}`}
      type="button"
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
