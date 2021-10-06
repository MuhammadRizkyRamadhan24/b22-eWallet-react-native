import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const transferToUser = (token, Data) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  const form = new URLSearchParams();
  form.append('phoneNumberReceiver', Data.phoneNumberReceiver);
  form.append('deductedBalance', Data.deductedBalance);
  form.append('description', Data.description);
  try {
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/transfer/user`,
      form.toString(),
    );
    dispatch({
      type: 'TRANSFER',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const historyReceiver = (token, page) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/transfer/receiver?sort[createdAt]=0&page=${page}`,
    );
    dispatch({
      type: 'TRANSFER_HISTORY_BY_RECEIVER',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_RECEIVER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const historySender = (token, page) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  console.log(page);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/transfer/sender?sort[createdAt]=1&page=${page}`,
    );
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSFER_HISTORY_BY_SENDER_FAILED',
      payload: err.response.data.message,
    });
  }
};
