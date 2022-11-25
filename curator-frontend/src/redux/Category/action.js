export const actions = {
  // GET_PATIENT_REQUEST: "GET_PATIENT_REQUEST",
  // GET_PATIENT_SUCCESS: "GET_PATIENT_SUCCESS",

  // CREATE_PATIENT_REQUEST: "CREATE_PATIENT_REQUEST",
  // CREATE_PATIENT_SUCCESS: "CREATE_PATIENT_SUCCESS",

  

  CATEGORY_LIST_REQUEST: "CATEGORY_LIST_REQUEST",
  CATEGORY_LIST_SUCCESS: "CATEGORY_LIST_SUCCESS",

  // PATIENT_DISEASE_REQUEST: "PATIENT_DISEASE_REQUEST",
  // PATIENT_DISEASE_SUCCESS: "PATIENT_DISEASE_SUCCESS",

  // getPatientList: () => ({ type: actions.GET_PATIENT_REQUEST }),
  // createPatient: (data, tab) => {
  //   return {
  //     type: actions.CREATE_PATIENT_REQUEST,
  //     data,
  //     tab,
  //   };
  // },
  // createPatientHealthData: (data, navigate) => {
  //   return {
  //     type: actions.CREATE_PATIENT_HEALTH_REQUEST,
  //     data,
  //     navigate,
  //   };
  // },
  categoryList: (data) => {
    return {
      type: actions.CATEGORY_LIST_REQUEST,
      data,
    };
  },
  // patientDiseaseData: (data) => {
  //   return {
  //     type: actions.PATIENT_DISEASE_REQUEST,
  //     data,
  //   };
  // },
};
