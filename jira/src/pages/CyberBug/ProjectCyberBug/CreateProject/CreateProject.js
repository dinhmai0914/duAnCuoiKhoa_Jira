import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

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

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    setFieldValue("description", editorRef.current.getContent());
  };

  useEffect(() => {
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
  }, []);

  return (
    <div className="container mt-4 col pl-5">
      <h4 style={{ color: "rgb(94, 108, 132)" }}>Create Project</h4>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p className="mb-0">Name</p>
          <input className="'form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p className="mb-0">Description</p>

          <Editor
            name="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
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
        <div className="form-group">
          <select
            style={{
              fontSize: "15px",
              background: "rgb(244, 245, 247)",
              cursor: "pointer",
            }}
            className="form-control"
            name="categoryId"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option
                  style={{
                    fontSize: "15px",
                  }}
                  value={item.id}
                  key={index}
                >
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn-sm btn-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // console.log("props value", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log({ values });
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStatetoProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};

export default connect(mapStatetoProps)(createProjectForm);
