import { combineReducers } from 'redux';
import { errorReducer } from '../reducers/ErrorReducer';
import { statusReducer } from '../reducers/StatusReducer';
import { userReducer } from './UserReducer';

export const rootReducer = combineReducers({
    error: errorReducer,
    status: statusReducer,
    user: userReducer,
});
