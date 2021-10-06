import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const transactionPulsa = (token, Data) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  const form = new URLSearchParams();
  form.append('number', Data.number);
  form.append('deductedBalance', Data.deductedBalance);
  form.append('description', Data.description);
  form.append('trxFee', Data.trxFee);
  try {
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/transaction`,
      form.toString(),
    );
    dispatch({
      type: 'TRANSACTIONS_PULSA',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTIONS_PULSA_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const historyTransaction = (token, page) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  console.log(page);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/transaction/pulsa?sort[createdAt]=1&page=${page}`,
    );
    dispatch({
      type: 'TRANSACTIONS_PULSA_HISTORY',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTIONS_PULSA_HISTORY_FAILED',
      payload: err.response.data.message,
    });
  }
};
