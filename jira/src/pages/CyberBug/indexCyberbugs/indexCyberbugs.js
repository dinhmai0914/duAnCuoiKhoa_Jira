import React from "react";
import ProjectDetail from "../ProjectCyberBug/projectDetail/projectDetail";

export default function indexCyberbugs() {
  return (
    <div className="mainContents col pl-0">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Library</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </div>
      <div className="title">
        <div className="mainTitle">
          <h3> Main Title</h3>
        </div>
        <div className="subTitle">
          <p>sub title</p>
        </div>
        <div className="navbarTab d-flex">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="search"
              aria-label="Search"
            />
          </form>
          <span className="ml-4">Only My Issue</span>
          <span className="ml-4">Recently Updated</span>
        </div>
      </div>

      <div className="progressContent">
        <div className="progressTab d-flex">
          <div
            className="card  text-center col-3 "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <div className="card-header">BACKLOG</div>
            <div className="card-body row align-content-center">
              <span class="card-title w-100 text-left">
                Special title treatment
              </span>
              <div className="card-text col-6">
                <p>High</p>
              </div>
              <div className="col-6">
                <img src="https://picsum.photos/40" alt="" />
              </div>
            </div>
            <div className="card-footer text-muted"></div>
          </div>

          <div
            className="card  text-center col-3 "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <div className="card-header">BACKLOG</div>
            <div className="card-body row align-content-center">
              <span class="card-title w-100 text-left">
                Special title treatment
              </span>
              <div className="card-text col-6">
                <p>High</p>
              </div>
              <div className="col-6">
                <img src="https://picsum.photos/40" alt="" />
              </div>
            </div>
            <div className="card-footer text-muted"></div>
          </div>

          <div
            className="card  text-center col-3 "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <div className="card-header">BACKLOG</div>
            <div className="card-body row align-content-center">
              <span class="card-title w-100 text-left">
                Special title treatment
              </span>
              <div className="card-text col-6">
                <p>High</p>
              </div>
              <div className="col-6">
                <img src="https://picsum.photos/40" alt="" />
              </div>
            </div>
            <div className="card-footer text-muted"></div>
          </div>

          <div
            className="card  text-center col-3 "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <div className="card-header">BACKLOG</div>
            <div className="card-body row align-content-center">
              <span class="card-title w-100 text-left">
                Special title treatment
              </span>
              <div className="card-text col-6">
                <p>High</p>
              </div>
              <div className="col-6">
                <img src="https://picsum.photos/40" alt="" />
              </div>
            </div>
            <div className="card-footer text-muted"></div>
          </div>

          <div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ProjectDetail></ProjectDetail>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="progressBoard"></div>
        </div>
      </div>
    </div>
  );
}
