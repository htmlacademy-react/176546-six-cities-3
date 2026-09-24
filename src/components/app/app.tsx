import MainPage from '../../pages/main-page/main-page.tsx';

const Settings = {
  cardCount: 5,
} as const;

function App(): JSX.Element {
  return (
    <MainPage
      cardCount = {Settings.cardCount}
    />
  );
}

export default App;
