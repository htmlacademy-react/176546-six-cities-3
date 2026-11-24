import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import clsx from 'clsx';
import { SORT_OPTIONS, SORT_OPTIONS_DICTIONARY } from '@/const';
import type { SortType } from '@/const';
import { useAppDispatch, useAppSelector, useOnClickOutside } from '@/hooks';
import { changeSortType, getSortType } from '@/store/slices/offers';

const sortKeys = Object.keys(SORT_OPTIONS) as SortType[];

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pendingFocusIndex = useRef<number | null>(null);
  const optionsId = useId();

  useOnClickOutside(formRef, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen || pendingFocusIndex.current === null) {
      return;
    }

    optionRefs.current[pendingFocusIndex.current]?.focus();
    pendingFocusIndex.current = null;
  }, [isOpen]);

  const closeOptions = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  const selectOption = (option: SortType) => {
    dispatch(changeSortType(option));
    closeOptions();
  };

  const focusOption = (index: number) => {
    const nextIndex = (index + sortKeys.length) % sortKeys.length;

    optionRefs.current[nextIndex]?.focus();
  };

  const handleToggleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen((opened) => !opened);
        break;
      case 'ArrowDown':
        event.preventDefault();
        pendingFocusIndex.current = sortKeys.indexOf(sortType);
        setIsOpen(true);
        break;
      case 'ArrowUp':
        event.preventDefault();
        pendingFocusIndex.current = sortKeys.length - 1;
        setIsOpen(true);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    index: number,
    option: SortType
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(option);
        break;
      case 'ArrowDown':
        event.preventDefault();
        focusOption(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusOption(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusOption(0);
        break;
      case 'End':
        event.preventDefault();
        focusOption(sortKeys.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeOptions();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <form ref={formRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        ref={toggleRef}
        className="places__sorting-type"
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        onClick={() => setIsOpen((opened) => !opened)}
        onKeyDown={handleToggleKeyDown}
      >
        {SORT_OPTIONS_DICTIONARY[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        id={optionsId}
        role="listbox"
        aria-label="Sort offers"
        className={clsx('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {sortKeys.map((option, index) => (
          <li
            ref={(node) => {
              optionRefs.current[index] = node;
            }}
            className={clsx('places__option', {
              'places__option--active': option === sortType,
            })}
            key={option}
            role="option"
            aria-selected={option === sortType}
            tabIndex={-1}
            onClick={() => selectOption(option)}
            onKeyDown={(event) => handleOptionKeyDown(event, index, option)}
          >
            {SORT_OPTIONS_DICTIONARY[option]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
