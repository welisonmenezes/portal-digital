import { IS_USER_LOGGEDIN, TRY_ACCESS_PROTECTED_ROUTE } from '../Actions/ActionTypes';

// utils/extras
import IsLoggedIn from '../../Utils/IsLoggedIn';

const initialState = {
    isUserLoggedin: IsLoggedIn(),
    messageProtectedRoute: null
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_USER_LOGGEDIN:
            return {
                ...state,
                isUserLoggedin: action.payload
            };
        case TRY_ACCESS_PROTECTED_ROUTE:
            return {
                ...state,
                messageProtectedRoute: action.payload
            };
        default:
            return state;
    }
};