import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './Routes/public.routes';
import store, { persistor } from './store';
import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <GlobalStyle />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
