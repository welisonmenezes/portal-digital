import { UsersReducer } from './UsersReducer';
import { UserReducer } from './UserReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  usersState: UsersReducer,
  userState: UserReducer
});