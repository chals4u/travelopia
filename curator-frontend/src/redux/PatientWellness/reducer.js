import { actions } from "./action";

const initialState = {
  patientWellness: [],
};

const patientWellnessReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PATIENT_SUCCESS:
      return {
        ...state,
        patientWellness: action.payload,
      };
    case actions.DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patientWellness: state.patientWellness.filter(
          (data) => data._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default patientWellnessReducer;
