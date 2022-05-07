import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
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

  const submitForm = (e) => {
    e.preventDefault();
    alert("submit edit");
  };

  useEffect(() => {
    setFieldValue("description", values.description);
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    setFieldValue("description", editorRef.current.getContent());
  };

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              type="text"
              className="form-control"
              name="id"
              disabled
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={values.projectName}
              type="text"
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              name="categoryId"
              onChange={handleChange}
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={values.description}
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
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    //Khi nguoi dung bam submit => dua du lieu ve backend thong qua api
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    };
    //goi saga
    props.dispatch(action);
  },

  displayName: "CreateProjectFormik",
})(FormEditProject);

const mapStatetoProps = (state) => {
  return {
    projectEdit: state.ProjectReducer.projectEdit,
  };
};
export default connect(mapStatetoProps)(editProjectForm);
