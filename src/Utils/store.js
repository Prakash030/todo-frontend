// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';

const persistConfig = {
    key: 'root',
    storage
  };
  
  const persistedReducer = persistReducer(persistConfig, combineReducers({
    user: userReducer
  }));
  
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  
  export { store, persistor };