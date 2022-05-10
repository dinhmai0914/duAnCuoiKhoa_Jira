import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Select, Radio } from "antd";
import { Slider } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { DOMAIN_cyberbug, TOKEN } from "../../../util/settingSystem";

function FormCreateTask(props) {
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const editorRef = useRef(null);
  const children = [];
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    setFieldValue("description", editorRef.current.getContent());
  };

  const { arrProject, taskType, taskPriority } = useSelector(
    (state) => state.ProjectCyberbugsReducer
  );

  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);

  const { arrStatus } = useSelector((state) => state.StatusReducer);

  const userOption = arrUser?.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECT_SAGA",
    });
    dispatch({
      type: "GET_ALL_TASKTYPE_SAGA",
    });
    dispatch({
      type: "GET_ALL_PRIORITY_SAGA",
    });
    dispatch({ type: "GET_USER_API", keyWord: " " });
    dispatch({ type: "GET_ALL_STATUS_SAGA" });
    dispatch({ type: "SET_SUBMIT_CREATE_TASK", submitFunction: handleSubmit });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            let { value } = e.target;
            dispatch({
              type: "GET_USER_BY_PROJECT_ID_SAGA",
              idProject: value,
            });

            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task Name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {taskPriority.map((taskpriority, index) => {
                return (
                  <option key={index} value={taskpriority.priorityId}>
                    {taskpriority.priority}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-6">
            <p>Task type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {taskType.map((tasktype, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {tasktype.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assigner</p>
            <Select
              name="listUserAsign"
              mode="tags"
              size="default"
              placeholder="Please select"
              optionFilterProp="label"
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              onSearch={(value) => {
                console.log("value", value);
              }}
              style={{ width: "100%" }}
              options={userOption}
            >
              {children}
            </Select>
            <div className="row mt-3">
              <div className="col-12" onChange={handleChange}>
                <p>Original estimate</p>
                <input
                  className="form-control"
                  name="originalEstimate"
                  type="number"
                  defaultValue="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <p>Time tracking</p>
            <Slider
              defaultValue={30}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6" onChange={handleChange}>
                <p>Time spent </p>
                <input
                  className="form-control"
                  name="timeTrackingSpent"
                  type="number"
                  defaultValue="0"
                  min="0"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6" onChange={handleChange}>
                <p>Time remaining </p>
                <input
                  className="form-control"
                  name="timeTrackingRemaining"
                  type="number"
                  defaultValue="0"
                  min="0"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          onChange={handleChange}
          name="description"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={log}
        />
      </div>
      {/* <button type="submit">submit</button> */}
    </form>
  );
}

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, taskType, taskPriority, arrStatus } = props;
    if (arrProject.length > 0) {
      props.dispatch({
        type: "GET_USER_BY_PROJECT_ID_SAGA",
        idProject: arrProject[0]?.id,
      });
    }
    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: taskType[0]?.id,
      priorityId: taskPriority[0]?.priorityId,
    };
  },
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: "CREATE_TASK_SAGA_API",
      taskObject: values,
    };
    props.dispatch(action);
    console.log("taskObject", values);
  },

  displayName: "CreateTaskForm",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectCyberbugsReducer.arrProject,
    taskType: state.ProjectCyberbugsReducer.taskType,
    taskPriority: state.ProjectCyberbugsReducer.taskPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(formCreateTask);
