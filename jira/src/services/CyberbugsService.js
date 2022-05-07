import { DOMAIN_cyberbug, TOKEN } from "../util/settingSystem";
import Axios from "axios";

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_cyberbug}/ProjectCategory`,
      method: "GET",
    });
  },

  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },

  createProjectAuthorization: (newProject) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },

  getListProject: () => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },

  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
};
