import { USER_LOGIN } from "../../util/settingSystem";
import { USLOGIN } from "../constant/CyberBugs";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = { userLogin: usLogin, userSearch: [], arrUser: [] };

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }

    case "GET_USER_SEARCH": {
      state.userSearch = action.listUserSearch;

      return { ...state };
    }

    case "GET_USER_BY_ID": {
      state.arrUser = action.arrUser;

      return { ...state };
    }

    default:
      return { ...state };
  }
};
