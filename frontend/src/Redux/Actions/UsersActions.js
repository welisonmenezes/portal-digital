import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} from './ActionTypes';

export const getUsers = value => ({
    type: GET_USERS,
    payload: value
});

export const getUsersSuccess = value => ({
    type: GET_USERS_SUCCESS,
    payload: value
});

export const getUsersError = value => ({
    type: GET_USERS_ERROR,
    payload: value
});
