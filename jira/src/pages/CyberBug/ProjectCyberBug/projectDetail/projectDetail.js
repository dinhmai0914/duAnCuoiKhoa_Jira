import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";

export default function ProjectDetail(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  console.log("taskDetailModal", taskDetailModal);

  const { arrStatus } = useSelector((state) => state.StatusReducer);
  // console.log("arrStatus", arrStatus);

  const { taskPriority, taskType } = useSelector(
    (state) => state.ProjectCyberbugsReducer
  );
  // console.log("taskPriority", taskPriority);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const editorRef = useRef(null);
  const [visibleEditor, setVisibleEditor] = useState(false);

  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ALL_STATUS_SAGA" });
    dispatch({
      type: "GET_ALL_PRIORITY_SAGA",
    });
    dispatch({
      type: "GET_ALL_TASKTYPE_SAGA",
    });
  }, []);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              // onChange={handleChange}
              name="description"
              initialValue={taskDetailModal.description}
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
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn-sm btn-primary mr-2 mt-3"
              onClick={() => {
                dispatch({
                  type: "HANDLE_CHANGE_POST_API_SAGA",
                  actionType: "CHANGE_TASK_MODEL",
                  name: "description",
                  value: content,
                });
                // dispatch({
                //   type: "CHANGE_TASK_MODEL",
                //   name: "description",
                //   value: content,
                // });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn-sm btn-secondary"
              onClick={() => {
                dispatch({
                  type: "HANDLE_CHANGE_POST_API_SAGA",
                  actionType: "CHANGE_TASK_MODEL",
                  name: "description",
                  value: historyContent,
                });

                // dispatch({
                //   type: "CHANGE_TASK_MODEL",
                //   name: "description",
                //   value: historyContent,
                // });

                setVisibleEditor(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_CHANGE_POST_API_SAGA",
      actionType: "CHANGE_TASK_MODEL",
      name,
      value,
    });
    // dispatch({ type: "CHANGE_TASK_MODEL", name, value });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);

    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div className="d-flex">
          <i className="fa fa-clock mr-2" style={{ fontSize: "18px" }}></i>
          <div className="w-100">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="remaining-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projectDetail container row">
      <div className="commentTab col-8">
        <div className="taskNamePJ ">
          <p style={{ fontSize: "20px" }} className="ml-0">
            <i className="fa fa-bookmark mr-2" style={{ color: "green" }} />
            {/* <select
              name="typeId"
              value={taskDetailModal.typeId}
              onChange={handleChange}
            >
              {taskType.map((tp, index) => {
                return <option value={tp.id}>{tp.taskType}</option>;
              })}
            </select> */}
            {taskDetailModal.taskName}
          </p>
        </div>
        <div className="commentContent">
          <h5>This is an issue of type: Task</h5> <br />
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Description
          </span>
          <p
            className="mt-1"
            style={{
              background: "rgb(244, 245, 247)",
              borderRadius: "3px",
            }}
          >
            {renderDescription()}
          </p>
          <div className="commentInput">
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Comments
            </span>
            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                defaultValue={""}
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="progressTab col-4">
        <div className="statusInput">
          <div className="state">
            <div className="title" style={{ fontSize: "15px" }}>
              STATUS
            </div>
            <select
              name="statusId"
              className="custom-select"
              style={{
                fontSize: "15px",
                cursor: "pointer",
                background: "rgb(244, 245, 247)",
              }}
              value={taskDetailModal.statusId}
              onChange={(e) => {
                handleChange(e);
                // const action = {
                //   type: "UPDATE_STATUS_TASK_SAGA",
                //   taskUpdateStatus: {
                //     taskId: taskDetailModal.taskId,
                //     statusId: e.target.value,
                //     projectId: taskDetailModal.projectId,
                //   },
                // };
                // dispatch(action);
              }}
            >
              {arrStatus?.map((status, index) => {
                return (
                  <option value={status.statusId} selected key={index}>
                    {status.statusName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="assignees d-flex justify-content-between mt-5">
            <div className="assignessItem">
              <div className="title" style={{ fontSize: "15px" }}>
                ASSIGNESS
              </div>

              {taskDetailModal.assigness?.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="item mb-1 d-flex align-items-center "
                    style={{
                      background: "#afd5ef",
                      borderRadius: "5px",
                      display: "flex",
                      fontSize: "13px",
                    }}
                  >
                    <div className="avatar">
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={user.avatar}
                      />
                      <i
                        onClick={() => {
                          dispatch({
                            type: "HANDLE_CHANGE_POST_API_SAGA",
                            actionType: "REMOVE_USER_ASSIGN",
                            userId: user.id,
                          });

                          // dispatch({
                          //   type: "REMOVE_USER_ASSIGN",
                          //   userId: user.id,
                          // });
                        }}
                        className="fa fa-times-circle mr-1 ml-1"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <span className="name">{user.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="addMoreBox  pt-5">
              <select
                name="lstUser"
                class="form-control"
                style={{ cursor: "pointer" }}
                onChange={(e) => {
                  const { name, value } = e.target;
                  if (value == "0") {
                    return "";
                  }
                  let userSelected = projectDetail.members.find(
                    (mem) => mem.userId == value
                  );
                  userSelected = {
                    ...userSelected,
                    id: userSelected.userId,
                  };
                  dispatch({
                    type: "HANDLE_CHANGE_POST_API_SAGA",
                    actionType: "CHANGE_ASSIGNESS",
                    userSelected,
                  });

                  // dispatch({
                  //   type: "CHANGE_ASSIGNESS",
                  //   userSelected,
                  // });
                }}
              >
                <option
                  value="0"
                  selected
                  style={{ color: "rgb(94, 108, 132)" }}
                >
                  +Add more
                </option>
                {projectDetail.members
                  ?.filter((mem) => {
                    let index = taskDetailModal.assigness?.findIndex(
                      (us) => us.id === mem.userId
                    );
                    if (index !== -1) {
                      return false;
                    }
                    return true;
                  })
                  ?.map((mem, index) => {
                    return (
                      <option key={index} value={mem.userId}>
                        {mem.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className="priority mt-5 " style={{ fontSize: "15px" }}>
            PRIORITY
            <select
              name="priorityId"
              style={{
                cursor: "pointer",
                fontSize: "15px",
                background: "rgb(244, 245, 247)",
              }}
              className="form-control"
              value={taskDetailModal.priorityId}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {taskPriority?.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="originalEstimate mt-4" style={{ fontSize: "15px" }}>
            <span>ORIGINAL ESTIMATE(HOURS)</span>
            <input
              style={{
                fontSize: "15px",
                cursor: "pointer",
              }}
              name="originalEstimate"
              className="form-control"
              type="number"
              value={taskDetailModal.originalEstimate}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="timeTracking mt-4" style={{ fontSize: "15px" }}>
            <span>TIME TRACKING</span>
            {renderTimeTracking()}
          </div>
        </div>
      </div>
    </div>
  );
}
