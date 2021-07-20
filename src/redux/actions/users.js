import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getUserById = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/users`);
    dispatch({
      type: 'GET_USER_BY_ID',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const changeUser = (token, Data) => async dispatch => {
  console.log(token, Data);
  const form = new FormData();
  if (Data.image !== undefined) {
    form.append('image', {
      uri: Data.image.uri,
      name: Data.image.fileName,
      type: Data.image.type,
    });
  }
  form.append('name', Data.fullName);
  form.append('email', Data.email);
  form.append('phone_number', Data.phoneNumber);
  console.log(form);
  try {
    const {data} = await http(token).patch(`${REACT_APP_BASE_URL}/users`, form);
    dispatch({
      type: 'CHANGE_USER',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'CHANGE_USER_FAILED',
      payload: err.response.data.message,
    });
  }
};
