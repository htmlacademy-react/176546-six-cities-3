import clsx from 'clsx';

type MapProps = {
  className: string;
};

function Map({ className }: MapProps): JSX.Element {
  return <section className={clsx(className, 'map')}></section>;
}

export default Map;
