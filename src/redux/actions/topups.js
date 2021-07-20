import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const topupToUser = (token, deductedBalance) => async dispatch => {
  const form = new URLSearchParams();
  form.append('deductedBalance', deductedBalance);
  try {
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/topup`,
      form.toString(),
    );
    dispatch({
      type: 'TOPUP',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'TOPUP_FAILED',
      payload: err.response.data.message,
    });
  }
};
