const initialState = {
  projectEdit: {
    id: 0,
    projectName: "projectName",
    creator: "creator",
    description: "description",
    categoryId: "2",
  },
  projectDetail: {},
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROJECT": {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }

    case "PUT_PROJECT_DETAIL": {
      state.projectDetail = action.getProjectDetail;
      return { ...state };
    }
    default:
      return state;
  }
};
