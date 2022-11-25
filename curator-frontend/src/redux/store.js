import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "redux/reducers";
import rootSaga from "redux/sagas";
import {composeWithDevTools} from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
