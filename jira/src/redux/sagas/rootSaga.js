import { all } from "redux-saga/effects";
import * as Cyberbugs from "./Cyberbugs/UserCyberBugSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";

export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoigetUserByProjectId(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoigetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    ProjectSaga.theoDoiGetAllTaskType(),
    ProjectSaga.theoDoigetTaskPriority(),
    TaskSaga.theoDoiCreateTask(),
    StatusSaga.theoDoiGetAllStatusSaga(),
  ]);
}
