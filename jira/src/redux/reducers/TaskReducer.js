const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 3,
      priority: "Low",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 850,
        avatar: "https://ui-avatars.com/api/?name=thangedit2",
        name: "thangedit2",
        alias: "thangtv",
      },
    ],
    lstComment: [],
    taskId: 3974,
    taskName: "admin456",
    alias: "admin456",
    description: "<p>123123123</p>",
    statusId: "1",
    originalEstimate: 2,
    timeTrackingSpent: 1,
    timeTrackingRemaining: 1,
    typeId: 1,
    priorityId: 3,
    projectId: 4521,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASK_DETAIL":
      return { ...state, taskDetailModal: action.taskDetailModal };
    case "CHANGE_TASK_MODEL":
      const { name, value } = action;

      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    case "CHANGE_ASSIGNESS": {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelected,
      ];
    }
    case "REMOVE_USER_ASSIGN": {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];
      return { ...state };
    }
    default:
      return state;
  }
};
