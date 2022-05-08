import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { history } from "../../../util/history";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbusg";
import { STATUS_CODE } from "../../../util/settingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constant/CyberBugs";

function* createProjectSaga(action) {
  //gọi api lấy dữ liệu về

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      history.pushState("/projectmanagement");
    }
  } catch (err) {
    console.log("err");
  }
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}
//---------------------------------------------------------------------

function* getListProjectSaga() {
  //gọi api lấy dữ liệu về

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
}

export function* theoDoigetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

//update project

function* updateProjectSaga(action) {
  //gọi api lấy dữ liệu về

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
}
export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}
