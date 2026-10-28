import { useState } from 'react';
import clsx from 'clsx';

const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

function Sorting(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<SortOption>('Popular');

  const handleOptionClick = (option: SortOption) => {
    setCurrentOption(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((opened) => !opened)}
      >
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {SORT_OPTIONS.map((option) => (
          <li
            className={clsx('places__option', {
              'places__option--active': option === currentOption,
            })}
            key={option}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
