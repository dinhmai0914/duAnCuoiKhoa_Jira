import { DOMAIN_cyberbug, TOKEN } from "../util/settingSystem";
import Axios from "axios";

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  get = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  delete = (url, model) => {
    return Axios({
      url: `${DOMAIN_cyberbug}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
