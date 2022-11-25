import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
// import { getQuery, postQuery } from "utils/api";
import { Toast } from "utils/Toast";
import { actions } from "./action";

// export function* getPatientList() {
//   yield takeLatest(actions.GET_PATIENT_REQUEST, function* () {
//     try {
//       const response = yield getQuery("patient/get");
//       if (!response.data.error) {
//         yield put({
//           type: actions.GET_PATIENT_SUCCESS,
//           payload: response.data.result,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Toast("error", error);
//     }
//   });
// }

// export function* createPatient() {
//   yield takeLatest(actions.CREATE_PATIENT_REQUEST, function* ({ data, tab }) {
//     try {
//       const response = yield postQuery("patient/create", data);
//       if (!response.data.error) {
//         yield put({
//           type: actions.CREATE_PATIENT_SUCCESS,
//           payload: response.data.result,
//         });
//         localStorage.setItem("patient", JSON.stringify(response.data.result));
//         Toast("success", "Success!!");
//         tab(1);
//       } else {
//         Toast("error", response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       Toast("error", error);
//     }
//   });
// }

// export function* createPatientHealthData() {
//   yield takeLatest(
//     actions.CREATE_PATIENT_HEALTH_REQUEST,
//     function* ({ data, navigate }) {
//       try {
//         const response = yield postQuery("patient/medicalData", data);
//         if (!response.data.error) {
//           yield put({
//             type: actions.CREATE_PATIENT_HEALTH_SUCCESS,
//             payload: response.data.result,
//           });
//           Toast("success", "Success!!");
//           navigate("/dashboard");
//         } else {
//           Toast("error", response.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         Toast("error", error);
//       }
//     }
//   );
// }

export function* categoryList() {
  yield takeLatest(actions.CATEGORY_LIST_REQUEST, function* ({ data }) {
    try {
      const response = yield axios.get(
        `https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/getCategories`
      );

      if (response.status === 200) {
        yield put({
          type: actions.CATEGORY_LIST_SUCCESS,
          payload: response.data.result,
        });
      } else {
        Toast("error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Toast("error", error);
    }
  });
}
// export function* patientDiseaseData() {
//   yield takeLatest(actions.PATIENT_DISEASE_REQUEST, function* ({ data }) {
//     try {
//       const response = yield axios.get(
//         `https://hpo.jax.org/api/hpo/disease/${data}`
//       );

//       if (response.status === 200) {
//         yield put({
//           type: actions.PATIENT_DISEASE_SUCCESS,
//           payload: response.data.catTermsMap,
//         });
//       } else {
//         Toast("error", response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       Toast("error", error);
//     }
//   });
// }

export default function* categorySaga() {
  yield all([
    // fork(getPatientList),
    // fork(createPatient),
    // fork(createPatientHealthData),
    fork(categoryList),
    // fork(patientDiseaseData),
  ]);
}
