const stateDefault = {
  projectList: [],
  arrProject: [], //tao rieng cho get all project
  taskType: [],
  taskPriority: [],
};

export const ProjectCyberbugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state };
    }

    case "GET_ALL_PROJECT": {
      state.arrProject = action.arrProject;
      return { ...state, arrProject: action.arrProject };
    }

    case "GET_ALL_TASKTYPE": {
      state.taskType = action.taskType;
      return { ...state, taskType: action.taskType };
    }

    case "GET_TASK_PRIORITY": {
      state.taskPriority = action.taskPriority;
      return { ...state, taskPriority: action.taskPriority };
    }

    default:
      return { ...state };
  }
};
