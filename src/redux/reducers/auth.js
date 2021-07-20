const initialState = {
  token: null,
  userDetail: null,
  msg: '',
  notifToken: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return {
        ...state,
        token: action.payload.resultToken,
        userDetail: action.payload.userDetail,
        msg: action.payload.message,
      };
    }
    case 'AUTH_LOGIN_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'AUTH_NOTIF_TOKEN': {
      return {
        ...state,
        notifToken: action.payload,
      };
    }
    case 'AUTH_REGISTER': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'AUTH_REGISTER_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        token: null,
        userDetail: null,
        msg: '',
      };
    }
    case 'AUTH_RESET': {
      return {
        ...state,
        msg: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
