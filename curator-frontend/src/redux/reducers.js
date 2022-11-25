import { combineReducers } from "redux";
import patientWellnessReducer from "./PatientWellness/reducer";
import patientReducer from "./Patient/reducer";
import categoryReducer from "./Category/reducer";
import questionReducer from "./Question/reducer";
import userReducer from "./User/reducer";
import loaderReducer from "./Loader/reducer";
import searchReducer from "./Search/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  patientWellness: patientWellnessReducer,
  patient: patientReducer,
  category: categoryReducer,
  question: questionReducer,
  loader: loaderReducer,
  search: searchReducer,
});

export default rootReducer;
