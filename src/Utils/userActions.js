// userActions.js
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo
});

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
});
