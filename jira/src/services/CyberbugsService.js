import { CYBERSOFT_TOKEN, DOMAIN_cyberbug, TOKEN } from "../util/settingSystem";
import Axios from "axios";

export const cyberbugsService = {
  signUpCyberBugs: (userSignUp) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Users/signup`,
      method: "POST",
      data: userSignUp,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Users/signin`,
      method: "POST",
      data: userLogin,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_cyberbug}/ProjectCategory`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/createProject`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  createProjectAuthorization: (newProject) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  getListProject: () => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },

  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  },
};
