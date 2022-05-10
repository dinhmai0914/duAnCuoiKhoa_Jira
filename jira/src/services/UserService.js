import Axios from "axios";
import { DOMAIN_cyberbug, TOKEN } from "../util/settingSystem";
import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserProjectById = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const userService = new UserService();
