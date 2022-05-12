import Axios from "axios";
import {
  call,
  delay,
  fork,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { userService } from "../../../services/UserService";
import { history } from "../../../util/history";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../util/settingSystem";
import {
  USER_SIGNIN_API,
  USER_SIGNUP_API,
  USLOGIN,
} from "../../constant/CyberBugs";
import { projectService } from "../../../services/ProjectService";

//sign up

function* signUpSaga(action) {
  //Goi API
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signUpCyberBugs(action.userSignUp)
    );

    yield put({
      type: "USSIGNUP",
      userSignUp: data.content,
    });

    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/login");
  } catch (err) {
    console.log(err.response.data);
    alert("data is not valid !");
  }
}

export function* theoDoiSignUp() {
  yield takeLatest(USER_SIGNUP_API, signUpSaga);
}

//sign in
function* signinSaga(action) {
  //Goi API
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );
    // Luu Token vao Local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/projectmanagement");
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

//---------------------------------------------------

function* getUserSaga(action) {
  //Goi API

  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );

    yield put({
      type: "GET_USER_SEARCH",
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

//----------------------------------------------------

function* addUserProjectSaga(action) {
  //Goi API
  console.log(action);
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log("err", err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//--------------------------------------------------------

function* removeUserProjectSaga(action) {
  //Goi API

  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log("loi");
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

//--------------------------------------------------------

function* getUserByProjectIdSaga(action) {
  //Goi API
  const { idProject } = action;

  try {
    const { data, status } = yield call(() =>
      userService.getUserProjectById(idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_USER_BY_ID",
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log("loi", err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: "GET_USER_BY_ID",
        arrUser: [],
      });
    }
  }
}

export function* theoDoigetUserByProjectId() {
  yield takeLatest("GET_USER_BY_PROJECT_ID_SAGA", getUserByProjectIdSaga);
}
