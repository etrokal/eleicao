export const SHOW_USER_DATA = "SHOW_USER_DATA";
export const HIDE_USER_DATA = "HIDE_USER_DATA";

export const showUserData = user => ({ type: SHOW_USER_DATA, payload: user });
export const hideUserData = () => ({ type: HIDE_USER_DATA });
