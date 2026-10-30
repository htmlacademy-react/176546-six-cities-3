import { useState } from 'react';
import clsx from 'clsx';
import { SORT_OPTIONS } from '@/const';
import type { SortType } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeSortType } from '@/store/action';
import { getSortType } from '@/store/selectors';

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: SortType) => {
    dispatch(changeSortType(option));
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
