import { TYPES } from '../actions/UserAction';

export const userReducer = (state = {}, { payload, type }) => {
    switch (type) {
        case TYPES.LOGIN_SUCCESS:
            return { ...state, ...payload.user };
        case TYPES.CLEAR_STORE:
            return {};
        default:
            return state;
    }
};
