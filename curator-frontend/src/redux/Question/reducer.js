import {actions} from "./action";

const initialState = {
  createAnswer: [],
  approveAnswer: [],
  questionList: [],
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ANSWER_SUCCESS:
      const data_ = [...state.createAnswer, action.payload];
      return {
        ...state,
        createAnswer: data_,
      };
  case actions.APPROVE_ANSWER_SUCCESS:
    const approvedata_ = [...state.approveAnswer, action.payload];
    return {
      ...state,
      approveAnswer: approvedata_,
    };

    case actions.QUESTION_LIST_SUCCESS:
      return {
        ...state,
        questionList: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
