const initialState = {
  dataReceiver: [],
  dataSender: [],
  msgReceiver: '',
  msgSender: '',
};

const transfers = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSFER_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'TRANSFER_HISTORY_BY_RECEIVER': {
      return {
        ...state,
        dataReceiver: action.payload.results,
        msgReceiver: action.payload.message,
      };
    }
    case 'TRANSFER_HISTORY_BY_RECEIVER_FAILED': {
      return {
        ...state,
        msgReceiver: action.payload,
      };
    }
    case 'TRANSFER_HISTORY_BY_SENDER': {
      return {
        ...state,
        dataSender: action.payload.results,
        msgSender: action.payload.message,
      };
    }
    case 'TRANSFER_HISTORY_BY_SENDER_FAILED': {
      return {
        ...state,
        msgSender: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transfers;
