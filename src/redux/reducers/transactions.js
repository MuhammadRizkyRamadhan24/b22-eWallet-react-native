const initialState = {
  data: [],
  msgHistory: '',
  msg: '',
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONS_PULSA': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSACTIONS_PULSA_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSACTIONS_PULSA_HISTORY': {
      return {
        ...state,
        data: action.payload.results,
        msg: action.payload.message,
      };
    }
    case 'TRANSACTIONS_PULSA_HISTORY_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transactions;
