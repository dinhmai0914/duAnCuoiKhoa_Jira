import { combineReducers, createStore, applyMiddleware } from "redux";
import LoadingIconReducer from "./LoadingIconReducer";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "../sagas/rootSaga";
import { HistoryReducer } from "./HistoryReducer";
import { UserLoginCyberBugsReducer } from "./UserCyberBugsReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { ProjectCyberbugsReducer } from "./ProjectCyberbugsReducer";
import { drawerReducer } from "./DrawerCyberbugsReducer";
import { ProjectReducer } from "./ProjectReducer";
import { StatusReducer } from "./StatusReducer";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  LoadingIconReducer,
  HistoryReducer: HistoryReducer,
  UserLoginCyberBugsReducer,
  ProjectCategoryReducer,
  ProjectCyberbugsReducer,
  drawerReducer,
  ProjectReducer,
  StatusReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;
