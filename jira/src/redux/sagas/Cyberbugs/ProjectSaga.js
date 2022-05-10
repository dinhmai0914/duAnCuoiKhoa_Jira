import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { taskService } from "../../../services/TaskService";
import { history } from "../../../util/history";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbusg";
import { STATUS_CODE } from "../../../util/settingSystem";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
} from "../../constant/CyberBugs";

function* createProjectSaga(action) {
  //gọi api lấy dữ liệu về

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log({ data });

      let history = yield select((state) => state.HistoryReducer.history);
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log("err", err.response.data);
  }
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}
//---------------------------------------------------------------------

function* getListProjectSaga() {
  //gọi api lấy dữ liệu về
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );

    //gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log("err");
  }
  yield put({
    type: "HIDE_LOADING",
  });
}

export function* theoDoigetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

//update project

function* updateProjectSaga(action) {
  //gọi api lấy dữ liệu về
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );

    //gọi api thành công thì dispatch lên reducer thông qua PUT
    if (status === STATUS_CODE.SUCCESS) {
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: "HIDE_LOADING",
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

//delete project

function* deleteProjectSaga(action) {
  //gọi api lấy dữ liệu về

  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    //gọi api thành công thì dispatch lên reducer thông qua PUT
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete project is successfully!");
    } else {
      notifiFunction("error", "Delete project is fail!");
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (err) {
    console.log(err);
    notifiFunction("error", "Delete project is fail!");
  }
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

//get project detail
function* getProjectDetailSaga(action) {
  //gọi api lấy dữ liệu về
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "PUT_PROJECT_DETAIL",
        getProjectDetail: data.content,
      });
    }
  } catch (err) {
    console.log("err");
    // history.push("./projectmanagement");
  }
  yield put({
    type: "HIDE_LOADING",
  });
}
export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}

//get all project
function* getAllProjectSaga(action) {
  //gọi api lấy dữ liệu về
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      projectService.getAllProject(action)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_ALL_PROJECT",
        arrProject: data.content,
      });
    }
  } catch (err) {
    console.log("err");
  }
  yield put({
    type: "HIDE_LOADING",
  });
}
export function* theoDoiGetAllProjectSaga() {
  yield takeLatest("GET_ALL_PROJECT_SAGA", getAllProjectSaga);
}

//get all task type
function* getAllTaskTypeSaga(action) {
  //gọi api lấy dữ liệu về

  try {
    const { data, status } = yield call(() =>
      projectService.getAllTaskType(action)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_ALL_TASKTYPE",
        taskType: data.content,
      });
    }
  } catch (err) {
    console.log("err");
    // history.push("./projectmanagement");
  }
}
export function* theoDoiGetAllTaskType() {
  yield takeLatest("GET_ALL_TASKTYPE_SAGA", getAllTaskTypeSaga);
}

//get task priority
function* getTaskPriority(action) {
  //gọi api lấy dữ liệu về

  try {
    const { data, status } = yield call(() =>
      projectService.getTaskPriority(action)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_TASK_PRIORITY",
        taskPriority: data.content,
      });
    }
  } catch (err) {
    console.log("err");
    // history.push("./projectmanagement");
  }
}
export function* theoDoigetTaskPriority() {
  yield takeLatest("GET_ALL_PRIORITY_SAGA", getTaskPriority);
}
