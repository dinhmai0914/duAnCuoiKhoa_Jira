import { baseService } from "./baseService";

export class ProjectService extends baseService {
  constructor() {
    super();
  }
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };

  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };

  getAllTaskType = () => {
    return this.get(`TaskType/getAll`);
  };

  getTaskPriority = () => {
    return this.get(`Priority/getAll`);
  };
}

export const projectService = new ProjectService();
