import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, postQuery } from "utils/api";
import { Toast } from "utils/Toast";
import { actions } from "./action";
import loaderAction from "redux/Loader/action";

export function* userRegistration() {
  yield takeLatest(
    actions.USER_REGISTRATION_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`user`, data);

        if (!response.data.error) {
          yield put({
            type: actions.USER_REGISTRATION_SUCCESS,
            payload: response.data.result,
          });
          yield put({
            type: loaderAction.CLOSE_LOADER,
          });
          Toast("success", "Success!!");
          const token = localStorage.getItem("TOKEN");

          if (token) {
            navigate("/");
          } else {
            navigate("/auth/emailverify");
          }
        } else {
          yield put({
            type: loaderAction.CLOSE_LOADER,
          });
          Toast("error", response.data.message);
        }
      } catch (e) {
        yield put({
          type: loaderAction.CLOSE_LOADER,
        });
        console.log(e);
      }
    }
  );
}
export function* userLogin() {
  yield takeLatest(actions.USER_LOGIN_REQUEST, function* ({ data, navigate }) {
    try {
      const response = yield postQuery(`user/login`, data);
      if (!response.data.error) {
        yield put({
          type: actions.USER_LOGIN_SUCCESS,
          payload: response.data.result,
        });
        yield put({
          type: loaderAction.CLOSE_LOADER,
        });

        //Toast("success", "Success!!");
        console.log("jjj =>", response.data?.result.detail);
        if (
          response.data?.result.detail?.first_name &&
          response.data?.result.detail.email === "anttiny1981@gmail.com"
        ) {
          navigate("/admin/answers");
        } else if (
          response.data?.result.detail?.first_name &&
          response.data?.result.detail.email !== "anttiny1981@gmail.com"
        ) {
          navigate("/");
        } else {
          navigate("/auth/register");
        }
      } else {
        yield put({
          type: loaderAction.CLOSE_LOADER,
        });
        Toast("error", response.data.message);
      }
    } catch (e) {
      yield put({
        type: loaderAction.CLOSE_LOADER,
      });
      localStorage.removeItem("TOKEN");
      console.log(e);
    }
  });
}
export function* userDetail() {
  yield takeLatest(actions.USER_DETAIL_REQUEST, function* () {
    try {
      const response = yield getQuery(`user`);
      if (!response.data.error) {
        yield put({
          type: actions.USER_DETAIL_SUCCESS,
          payload: response.data.result,
        });
      } else {
        Toast("error", response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
export function* userLogout() {
  yield takeLatest(actions.USER_LOGOUT_REQUEST, function* ({ navigate }) {
    try {
      yield put({
        type: actions.USER_LOGOUT_SUCCESS,
      });
      navigate("/auth/login");
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* userSaga() {
  yield all([
    fork(userLogin),
    fork(userRegistration),
    fork(userLogout),
    fork(userDetail),
  ]);
}
