import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FileBase from "react-file-base64";

import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

import "./PostForm.css";

const valdationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});

function PostForm({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //const fileRef = useRef(null);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (values) => {
    // const formData = new FormData();
    // formData.append("creator", values.creator);
    // formData.append("title", values.title);
    // formData.append("message", values.message);
    // formData.append("tags", values.tags);
    // formData.append("selectedFile", values.selectedFile);

    // dispatch(createPost(formData));

    if (currentId) {
      dispatch(updatePost(currentId, { ...values, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...values, name: user?.result?.name }));
    }
    resetForm();
  };

  if (!user?.result?.name) {
    return (
      <Card className="text-center mt-4">
        <Card.Title className=" mt-1">
          Please Sign In to create your own memories and like other's memories.
        </Card.Title>
      </Card>
    );
  }

  const resetForm = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  return (
    <>
      {/* <Card
        bg="dark"
        text="white"
        style={{ width: "20rem" }}
        className="text-center mt-4"
      > */}

      <div className="form-card text-center mt-4">
        <Card.Title className=" mt-1">
          {currentId ? "Edit" : "Create"} a Post
        </Card.Title>

        <Card.Body>
          <Formik
            initialValues={{
              creator: "",
              title: "",
              message: "",
              tags: "",
              selectedFile: null,
            }}
            validationSchema={valdationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                {/* <div className="form-group">
                  <label htmlFor="title">Creator</label>
                  <Field
                    name="creator"
                    type="text"
                    className="form-control"
                    placeholder={postData.creator}
                  />
                  <ErrorMessage
                    component="div"
                    name="creator"
                    className="invalid-feedback"
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder={postData.title}
                  />
                  <ErrorMessage
                    component="div"
                    name="title"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <Field
                    as="textarea"
                    cols="30"
                    rows="5"
                    name="message"
                    type="text"
                    className="form-control"
                    placeholder={postData.message}
                  />
                  <ErrorMessage
                    component="div"
                    name="message"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <Field
                    name="tags"
                    type="text"
                    className="form-control"
                    placeholder={postData.tags}
                    onChange={(e) => {
                      setFieldValue("tags", e.target.value.split(","));
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="tags"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="selectedFile">Selected File</label>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFieldValue("selectedFile", base64)
                    }
                  />
                </div>

                {values.selectedFile && (
                  <img
                    className="image mb-3"
                    src={values.selectedFile}
                    alt="preview"
                  />
                )}

                {/* <div className="form-group">
                <label htmlFor="selectedFile">Selected File</label>
                <input
                  ref={fileRef}
                  type="file"
                  name="selectedFile"
                  onChange={(e) => {
                    setFieldValue("selectedFile", e.target.files[0]);
                  }}
                />
              </div>

              {values.selectedFile && (
                <img
                  className="image mb-3"
                  src={URL.createObjectURL(values.selectedFile)}
                  alt="preview"
                />
              )} */}
                <div className="button-box">
                  <Button className="purchase m-2" variant="" type="submit">
                    Submit
                  </Button>
                  <Button
                    onClick={resetForm}
                    className="purchase m-2"
                    variant=""
                    type="reset"
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </div>
      {/* </Card> */}
    </>
  );
}

export default PostForm;
