import React from "react";

export default function FormCreateTask(props) {
  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <Select name="projectId" classNameform-control>
          <option value="">Project A</option>
          <option value="">Project B</option>
        </Select>
      </div>
    </div>
  );
}
