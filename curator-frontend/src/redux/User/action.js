export const actions = {
  USER_AUTH_REQUEST: "USER_AUTH_REQUEST",
  USER_AUTH_SUCCESS: "USER_AUTH_SUCCESS",

  USER_TOKEN_REQUEST: "USER_TOKEN_REQUEST",
  USER_TOKEN_SUCCESS: "USER_TOKEN_SUCCESS",

  USER_REGISTRATION_REQUEST: "USER_REGISTRATION_REQUEST",
  USER_REGISTRATION_SUCCESS: "USER_REGISTRATION_SUCCESS",

  USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",

  USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST",
  USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",

  USER_DETAIL_REQUEST: "USER_DETAIL_REQUEST",
  USER_DETAIL_SUCCESS: "USER_DETAIL_SUCCESS",

  userRegistration: (data, navigate) => {
    return {
      type: actions.USER_REGISTRATION_REQUEST,
      data,
      navigate,
    };
  },

  userLogin: (data, navigate) => {
    return {
      type: actions.USER_LOGIN_REQUEST,
      data,
      navigate,
    };
  },

  userDetail: (data) => {
    return {
      type: actions.USER_DETAIL_REQUEST,
      data,
    };
  },
  userLogout: (navigate) => {
    return {
      type: actions.USER_LOGOUT_REQUEST,
      navigate,
    };
  },
};
