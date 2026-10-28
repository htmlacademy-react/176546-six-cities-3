import clsx from 'clsx';
import type { City, CityName } from '@/types/city';

type CityOption = City & { name: CityName };

type TabsProps = {
  cities: readonly CityOption[];
  activeCity: City;
  onCityChange: (cityName: CityName) => void;
};

function Tabs({ cities, activeCity, onCityChange }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={clsx('locations__item-link', 'tabs__item', {
                  'tabs__item--active': city.name === activeCity.name,
                })}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(city.name);
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
