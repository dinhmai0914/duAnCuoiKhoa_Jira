import React from "react";

export default function projectDetail() {
  return (
    <div className="projectDetail container row">
      <div className="commentTab col-8">
        <div className="taskNamePJ d-flex mt-5 ">
          <select className="optionBug form-control ">
            <option>Bug</option>
            <option>New task</option>
          </select>
          <p>Task name</p>
        </div>
        <div className="commentContent">
          <h5>Title </h5>
          <span>Description</span> <br />
          <span>Please add this to task</span>
          <div className="commentInput">
            <span>Comments</span>
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
        <div className="headerItem d-flex">
          <div className="ml-5">
            <i className="fa fa-paper-plane"></i> <span>Give feedback</span>
          </div>
          <div className="ml-5">
            <i className="fa fa-link"></i> <span>Copy link</span>
          </div>
        </div>
        <div className="statusInput mt-5">
          <div className="title">STATUS</div>
          <select class="form-control">
            <option>BACKLOG</option>
            <option>IN PROGRESS</option>
            <option>DONE</option>
          </select>
          <div className="assignees d-flex mt-5">
            <div className="media">
              <img src="https://picsum.photos/40" className="mr-3" alt="..." />
              <div className="media-body">
                <p>Media heading</p>
              </div>
            </div>
            <div className="addMoreBox w-25 ml-5  ">
              <select class="form-control">
                <option>+Add more</option>
              </select>
            </div>
          </div>
          <div className="priority mt-5">
            <select class="form-control">
              <option>Highest</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="originalEstimate mt-5">
            <span>ORIGINAL ESTIMATE(HOURS)</span>
            <input className="form-control" type="number" />
          </div>
          <div className="timeTracking mt-5">
            <span>TIME TRACKING</span>
            <div className="progress">
              <div
                className="progress-bar w-75"
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
