import axios from 'axios';
import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { Toast } from 'utils/Toast';

import { actions } from './action';


export function* searchData() {
  yield takeLatest(actions.SEARCH_REQUEST, function* ({ data }) {
    try {       
     
      const body = {
        message: {
          sender: 'user',
          message: `${data}`,
        },
      };
      const response = yield axios.post(
        `http://34.125.190.195:5050/post`,
        body,
      );
      if (response.status === 200) {
        yield put({
          type: actions.SEARCH_SUCCESS,
          payload: response.data,
        });
      } else {
        Toast('error', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Toast('error', error);
    }
  });
}

export default function* patientSaga() {
  yield all([fork(searchData)]);
}
