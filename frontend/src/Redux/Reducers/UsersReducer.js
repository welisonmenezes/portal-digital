import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} from '../Actions/ActionTypes';

const initialState = {
    users: [],
    loadingUsers: false,
    errorUsers: null
};

export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loadingUsers: action.payload
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            };
            //state.data.push({id:Math.floor(Math.random() * 10),employee_name: 'welison'})
            //return state;
        case GET_USERS_ERROR:
            return {
                ...state,
                errorUsers: action.payload
            };
        default:
            return state;
    }
};