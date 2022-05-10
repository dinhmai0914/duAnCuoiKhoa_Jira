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
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    console.log({ data });

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
