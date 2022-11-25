export const actions = {
  GET_PATIENT_REQUEST: "GET_PATIENT_REQUEST",
  GET_PATIENT_SUCCESS: "GET_PATIENT_SUCCESS",

  DELETE_PATIENT_REQUEST: "DELETE_PATIENT_REQUEST",
  DELETE_PATIENT_SUCCESS: "DELETE_PATIENT_SUCCESS",
  getPatientsList: () => ({ type: actions.GET_PATIENT_REQUEST }),
  deletePatient: (id) => {
    return {
      type: actions.DELETE_PATIENT_REQUEST,
      id,
    };
  },
};
