import clsx from 'clsx';
import { CITIES } from '@/const';
import type { City } from '@/types/city.ts';

type TabsProps = {
  activeCity: City;
  onCityChange: (city: City) => void;
};

function Tabs({ activeCity, onCityChange }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={clsx('locations__item-link', 'tabs__item', {
                  'tabs__item--active': city.name === activeCity.name,
                })}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
