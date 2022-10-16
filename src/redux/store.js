import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { searchReducer } from './reducers/searchReducer';
import { uiReducer } from './reducers/uiReducer';
import { loginReducer } from './reducers/loginReducer';
import { registerReducer } from './reducers/registerReducer';
import { snackbarReducer } from './reducers/snackbarReducer';
import { allTrackingItemsReducer } from './reducers/allTrackingProductsReducer';
import { productHistoryReducer } from './reducers/productHistoryReducer';
import { dialogReducer } from './reducers/dialogReducer';
const persistConfig = {
    key: 'pricepro',
    storage
};
const rootReducer = combineReducers({
    search: searchReducer,
    customization: uiReducer,
    login: loginReducer,
    register: registerReducer,
    snackbar: snackbarReducer,
    allTrackingItems: allTrackingItemsReducer,
    productHistory: productHistoryReducer,
    dialog: dialogReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);
