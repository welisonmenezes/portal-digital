import { IS_USER_LOGGEDIN, TRY_ACCESS_PROTECTED_ROUTE } from '../Actions/ActionTypes';

export const setUserLogginStatus = value => ({
    type: IS_USER_LOGGEDIN,
    payload: value
});

export const setMessageProtectedRoute = value => ({
    type: TRY_ACCESS_PROTECTED_ROUTE,
    payload: value
});
