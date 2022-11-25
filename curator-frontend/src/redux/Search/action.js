export const actions = {
  SEARCH_REQUEST: "SEARCH_REQUEST",
  SEARCH_SUCCESS: "SEARCH_SUCCESS",

  searchData: (data) => {
    return {
      type: actions.SEARCH_REQUEST,
      data,
    };
  },
};
