import {all, fork, put, takeLatest} from "redux-saga/effects";
import {deleteQuery, getQuery} from "utils/api";
import {actions} from "./action";

export function* getPatientsList() {
  yield takeLatest(actions.GET_PATIENT_REQUEST, function* () {
    try {
      const response = yield getQuery("wellness");
      if (!response.data.error) {
        yield put({
          type: actions.GET_PATIENT_SUCCESS,
          payload: response.data.result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* deletePatient() {
  yield takeLatest(actions.DELETE_PATIENT_REQUEST, function* ({id}) {
    try {
      const response = yield deleteQuery(`wellness/${id}`);

      if (!response.data.error) {
        yield put({
          type: actions.DELETE_PATIENT_SUCCESS,
          payload: id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* patientWellnessSaga() {
  yield all([fork(deletePatient)]);
}
