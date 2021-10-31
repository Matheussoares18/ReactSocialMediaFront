import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userRegisterValues', 'authUser'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, devToolsEnhancer({}));

export const persistor = persistStore(store);

export default store;
