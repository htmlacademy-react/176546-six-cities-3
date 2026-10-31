import { useRef, useState } from 'react';
import clsx from 'clsx';
import { SORT_OPTIONS, SORT_OPTIONS_DICTIONARY } from '@/const';
import type { SortType } from '@/const';
import { useAppDispatch, useAppSelector, useOnClickOutside } from '@/hooks';
import { changeSortType } from '@/store/action';
import { getSortType } from '@/store/selectors';

const sortKeys = Object.keys(SORT_OPTIONS) as SortType[];

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useOnClickOutside(formRef, () => setIsOpen(false));

  const handleOptionClick = (option: SortType) => {
    dispatch(changeSortType(option));
    setIsOpen(false);
  };

  return (
    <form ref={formRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((opened) => !opened)}
      >
        {SORT_OPTIONS_DICTIONARY[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {sortKeys.map((option) => (
          <li
            className={clsx('places__option', {
              'places__option--active': option === sortType,
            })}
            key={option}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {SORT_OPTIONS_DICTIONARY[option]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
