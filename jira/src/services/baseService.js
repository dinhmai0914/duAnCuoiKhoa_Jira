import { CYBERSOFT_TOKEN, DOMAIN_cyberbug, TOKEN } from "../util/settingSystem";
import Axios from "axios";

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  };

  get = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  };

  delete = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: CYBERSOFT_TOKEN,
      },
    });
  };
}
