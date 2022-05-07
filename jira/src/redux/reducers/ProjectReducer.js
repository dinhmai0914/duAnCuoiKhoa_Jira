const initialState = {
  projectEdit: {
    id: 0,
    projectName: "projectName",
    creator: "creator",
    description: "description",
    categoryId: "2",
  },
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROJECT": {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }
    default:
      return state;
  }
};
