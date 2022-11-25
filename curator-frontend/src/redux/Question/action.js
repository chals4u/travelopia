export const actions = {
  APPROVE_ANSWER_REQUEST: "APPROVE_ANSWER_REQUEST",
  APPROVE_ANSWER_SUCCESS: "APPROVE_ANSWER_SUCCESS",

  CREATE_ANSWER_REQUEST: "CREATE_ANSWER_REQUEST",
  CREATE_ANSWER_SUCCESS: "CREATE_ANSWER_SUCCESS",

  QUESTION_LIST_REQUEST: "QUESTION_LIST_REQUEST",
  QUESTION_LIST_SUCCESS: "QUESTION_LIST_SUCCESS",

  approveAnswer: (data) => {
    return {
      type: actions.APPROVE_ANSWER_REQUEST,
      data,
      
    };
  },
  createAnswer: (data) => {
    return {
      type: actions.CREATE_ANSWER_REQUEST,
      data,
      
    };
  },
  questionList: (data) => {
    return {
      type: actions.QUESTION_LIST_REQUEST,
      data,
    };
  },
  
};
