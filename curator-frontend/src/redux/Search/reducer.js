import { actions } from "./action";

const initialState = {
  search: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
