import { all } from "redux-saga/effects";
import * as Cyberbugs from "./Cyberbugs/UserCyberBugSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";

export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoigetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
  ]);
}
