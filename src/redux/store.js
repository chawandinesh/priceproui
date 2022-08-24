import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { searchReducer } from './reducers/searchReducer';
import { uiReducer } from './reducers/uiReducer';
const persistConfig = {
    key: 'pricepro',
    storage
};
const rootReducer = combineReducers({ search: searchReducer, customization: uiReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);
