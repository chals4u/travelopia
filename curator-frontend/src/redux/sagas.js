import { all } from "redux-saga/effects";
import patientWellnessSaga from "redux/PatientWellness/saga";
import userSaga from "redux/User/saga";
import patientSaga from "redux/Patient/saga";
import categorySaga from "redux/Category/saga";
import questionSaga from "redux/Question/saga";
import loaderSaga from "redux/Loader/saga";
import searchSaga from "redux/Search/saga";

export default function* rootSaga() {
  yield all([
    patientWellnessSaga(),
    userSaga(),
    patientSaga(),
    categorySaga(),
    questionSaga(),
    loaderSaga(),
    searchSaga(),
  ]);
}
