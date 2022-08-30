import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { searchReducer } from './reducers/searchReducer';
import { uiReducer } from './reducers/uiReducer';
import { loginReducer } from './reducers/loginReducer';
import { registerReducer } from './reducers/registerReducer';
const persistConfig = {
    key: 'pricepro',
    storage
};
const rootReducer = combineReducers({ search: searchReducer, customization: uiReducer, login: loginReducer, register: registerReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);
