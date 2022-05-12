import {
  call,
  delay,
  fork,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";

import { notifiFunction } from "../../../util/Notification/NotificationCyberbusg";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/settingSystem";

function* createTaskSaga(action) {
  try {
    console.log({ action });
    const { data } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    console.log("data", data);

    yield put({
      type: "CLOSE_DRAWER",
    });
    notifiFunction("success", "Create task successfully!");
  } catch (err) {
    console.log("loi", err.respose.data);
  }
}

export function* theoDoiCreateTask() {
  yield takeLatest("CREATE_TASK_SAGA_API", createTaskSaga);
}
//get task detail

function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(action.taskId)
    );
    console.log(data.content);
    yield put({
      type: "GET_TASK_DETAIL",
      taskDetailModal: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoigetTaskDetailSaga() {
  yield takeLatest("GET_TASK_DETAIL_SAGA", getTaskDetailSaga);
}

// update task Status

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    yield put({
      type: "GET_PROJECT_DETAIL",
      projectId: taskUpdateStatus.projectId,
    });

    yield put({
      type: "GET_TASK_DETAIL_SAGA",
      taskId: taskUpdateStatus.taskId,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiupdateTaskStatusSaga() {
  yield takeLatest("UPDATE_STATUS_TASK_SAGA", updateTaskStatusSaga);
}

// update task

function* updateTaskSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    yield put({
      type: "GET_PROJECT_DETAIL",
      projectId: taskUpdateStatus.projectId,
    });

    yield put({
      type: "GET_TASK_DETAIL_SAGA",
      taskId: taskUpdateStatus.taskId,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiupdateTaskSaga() {
  yield takeLatest("UPDATE_TASK_SAGA", updateTaskSaga);
}

export function* handelChangePostApi(action) {
  console.log("abc", action);
  //goi action lam thay doi task detail modal

  switch (action.actionType) {
    case "CHANGE_TASK_MODEL":
      {
        const { value, name } = action;
        yield put({
          type: "CHANGE_TASK_MODEL",
          name,
          value,
        });
      }
      break;
    case "CHANGE_ASSIGNESS":
      {
        const { userSelected } = action;
        yield put({
          type: "CHANGE_ASSIGNESS",
          userSelected,
        });
      }
      break;
    case "REMOVE_USER_ASSIGN": {
      const { userId } = action;
      yield put({
        type: "REMOVE_USER_ASSIGN",
        userId,
      });
    }
  }
  //save qua api updateTaskSaga
  //Lay du lieu tu state.tasDetailModel
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("sau khi thay doi", taskDetailModal);

  //Bien doi du lieu state.taskDetailModel thanh du lieu api
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: "GET_TASK_DETAIL_SAGA",
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}
export function* theoDoihandelChangePostApi() {
  yield takeLatest("HANDLE_CHANGE_POST_API_SAGA", handelChangePostApi);
}
