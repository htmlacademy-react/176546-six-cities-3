import { useState } from 'react';
import clsx from 'clsx';
import { SORT_OPTIONS } from '@/const';
import type { SortType } from '@/const';

type SortingProps = {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
};

function Sorting({ sortType, onSortChange }: SortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: SortType) => {
    onSortChange(option);
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
        {sortType}
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
              'places__option--active': option === sortType,
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
