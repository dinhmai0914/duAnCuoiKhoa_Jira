import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import { statusService } from "../../../services/statusSevice";

function* getAllStatusSaga(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());

    yield put({
      type: "GET_ALL_STATUS",
      arrStatus: data.content,
    });
  } catch (err) {
    console.log("err", err.response?.data);
    // history.push("./projectmanagement");
  }
}
export function* theoDoiGetAllStatusSaga() {
  yield takeLatest("GET_ALL_STATUS_SAGA", getAllStatusSaga);
}
