import {actions} from "./action";

const initialState = {
  patient: [],
  patientHealth: [],
  patientSearchData: [],
  patientDiseaseData: [],
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
      };
    case actions.CREATE_PATIENT_SUCCESS:
      const data = [...state.patient, action.payload];
      return {
        ...state,
        patient: data,
      };
    case actions.CREATE_PATIENT_HEALTH_SUCCESS:
      const data_ = [...state.patientHealth, action.payload];
      return {
        ...state,
        patientHealth: data_,
      };

    case actions.PATIENT_SEARCH_SUCCESS:
      return {
        ...state,
        patientSearchData: action.payload,
      };
    case actions.PATIENT_DISEASE_SUCCESS:
      return {
        ...state,
        patientDiseaseData: action.payload,
      };

    default:
      return state;
  }
};

export default patientReducer;
