import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { networkService } from '../networking';
import { rootReducer } from '../reducers';
import { storage } from '../storages';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['error', 'status'],
};

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    applyMiddleware(thunk.withExtraArgument({ networkService }))
);

export const persistor = persistStore(store);
