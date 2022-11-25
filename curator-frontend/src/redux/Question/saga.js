import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { postQuery } from 'utils/api';
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

export function* createAnswer() {
  yield takeLatest(
    actions.CREATE_ANSWER_REQUEST,
    function* ({ data }) {
      try {
const response = yield postQuery("https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/answer", data);
if (!response.data.error) {
          yield put({
            type: actions.CREATE_ANSWER_SUCCESS,
            payload: response.data.result,
          });
         Toast("success", "Your answer has been submitted!!");
         //navigate("/dashboard");
        } else {
          Toast("error", response.data.message);
        }
      } catch (error) {
        console.log(error);
        Toast("error", error);
      }
    }
  );
}
export function* approveAnswer() {
  yield takeLatest(
    actions.APPROVE_ANSWER_REQUEST,
    function* ({ data }) {
      try {
const response = yield postQuery("https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/approve-answer", data);
if (!response.data.error) {
          yield put({
            type: actions.APPROVE_ANSWER_SUCCESS,
            payload: response.data.result,
          });
         Toast("success", "Your answer has been approved!!");
         //navigate("/dashboard");
        } else {
          Toast("error", response.data.message);
        }
      } catch (error) {
        console.log(error);
        Toast("error", error);
      }
    }
  );
}

export function* questionList() {
  yield takeLatest(actions.QUESTION_LIST_REQUEST, function* ({ data }) {
    try {
      const response = yield axios.get(
        `https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/question/${data}`
        
      );
      if (response.status === 200) {
        yield put({
          type: actions.QUESTION_LIST_SUCCESS,
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
export function* addWeight() {
  yield takeLatest(actions.ADD_WEIGHT_REQUEST, function* ({ data }) {
    try {
      const response = yield postQuery('patient/weight', data);
      if (!response.data.error) {
        yield put({
          type: actions.UPDATE_PATIENT_PROFILE_SUCCESS,
          payload: response.data.result,
        });
        Toast('success', 'Weight add successfully!!');
      } else {
        Toast('error', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Toast('error', error);
    }
  });
}

export default function* questionSaga() {
  yield all([
    // fork(getPatientList),
    fork(approveAnswer),
    fork(createAnswer),
    fork(questionList),
    // fork(patientDiseaseData),
  ]);
}
