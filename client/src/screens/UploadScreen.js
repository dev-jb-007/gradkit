import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import {
  createVideo,
  clearVideoErrors,
  clearVideoMessages,
} from "../redux/actions/videoActions";

import {
  createCourse,
  clearCourseErrors,
  clearCourseMessages,
} from "../redux/actions/courseActions";
import { Loader, Message } from "../components";
import { useSelector } from "react-redux";

const UploadScreen = () => {
  const dispatch = useDispatch();

  /* Course Upload */

  const [cTitle, setCTitle] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cSubjectCode, setCSubjectCode] = useState("");
  const [cPrice, setCPrice] = useState("");
  const [cSemister, setCSemister] = useState("");
  const [cThumbnail, setCThumbnail] = useState("");

  const uploadCourse = (e) => {
    e.preventDefault();
    const courseForm = new FormData();

    courseForm.append("title", cTitle);
    courseForm.append("description", cDescription);
    courseForm.append("price", cPrice);
    courseForm.append("semister", cSemister);
    courseForm.append("image", cThumbnail);
    courseForm.append("subjectCode", cSubjectCode);

    dispatch(createCourse(courseForm));

    setCTitle("");
    setCDescription("");
    setCPrice("");
    setCSemister("");
    setCThumbnail("");
    setCSubjectCode("");
  };

  /* Video Upload */

  const [vTitle, setvTitle] = useState("");
  const [vDescription, setvDescription] = useState("");
  const [vThumbnail, setvThumbnail] = useState("");
  const [vSubjectCode, setVSubjectCode] = useState("");
  const [video, setVideo] = useState("");
  const [vIndex, setVIndex] = useState("");
  const [vChapter, setVChapter] = useState("");

  const uploadVideo = (e) => {
    e.preventDefault();
    const videoForm = new FormData();
    videoForm.append("videoTitle", vTitle);
    videoForm.append("videoDescription", vDescription);
    videoForm.append("image", vThumbnail);
    videoForm.append("code", vSubjectCode);
    videoForm.append("video", video);
    videoForm.append("index", vIndex);
    videoForm.append("chapter", vChapter);

    dispatch(createVideo(videoForm));

    setVideo("");
    setvTitle("");
    setvDescription("");
    setvThumbnail("");
    setVSubjectCode("");
    setVIndex("");
    setVChapter("");
  };

  const { vLoading, vError, vMessage } = useSelector((state) => state.addVideo);

  const { cLoading, cError, cMessage } = useSelector(
    (state) => state.addCourse
  );

  /* Tab Change */

  const [activeTab, setActiveTab] = useState("course");

  useEffect(() => {
    if (vError) {
      setTimeout(() => {
        dispatch(clearVideoErrors());
      }, 3000);
    }

    if (vMessage) {
      setTimeout(() => {
        dispatch(clearVideoMessages());
      }, 3000);
    }

    if (cError) {
      setTimeout(() => {
        dispatch(clearCourseErrors());
      }, 3000);
    }

    if (cMessage) {
      setTimeout(() => {
        dispatch(clearCourseMessages());
      }, 3000);
    }
  }, [vError, vMessage, cError, cMessage, dispatch]);

  return (
    <UploadSection>
      {(cLoading || vLoading) && <Loader></Loader>}
      <FormContainer>
        <div className="form__changer">
          <button
            className={`form__changer-button ${
              activeTab === "course" ? "form__changer-active" : ""
            }`}
            onClick={() => setActiveTab("course")}
          >
            Upload Course
          </button>

          <button
            className={`form__changer-button
            ${activeTab === "video" ? "form__changer-active" : ""}`}
            onClick={() => setActiveTab("video")}
          >
            Upload Video
          </button>
        </div>

        {activeTab === "course" ? (
          <CourseForm onSubmit={uploadCourse} encType="multipart/form-data">
            <label className="form__label" htmlFor="title">
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              id="title"
              value={cTitle}
              onChange={(e) => setCTitle(e.target.value)}
            />

            <label className="form__label" htmlFor="description">
              Description
            </label>
            <input
              className="form__input"
              type="text"
              name="description"
              id="description"
              value={cDescription}
              onChange={(e) => setCDescription(e.target.value)}
            />
            <label className="form__label" htmlFor="subjectCode">
              Subject Code
            </label>
            <input
              className="form__input"
              type="number"
              name="subjectCode"
              id="subjectCode"
              value={cSubjectCode}
              onChange={(e) => setCSubjectCode(e.target.value)}
            />

            <label className="form__label" htmlFor="semister">
              Semister
            </label>
            <input
              className="form__input"
              type="text"
              name="semister"
              id="semister"
              value={cSemister}
              onChange={(e) => setCSemister(e.target.value)}
            />

            <label className="form__label" htmlFor="price">
              Price
            </label>
            <input
              className="form__input"
              type="text"
              name="price"
              id="price"
              value={cPrice}
              onChange={(e) => setCPrice(e.target.value)}
            />

            <label className="form__label" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              className="form__input"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setCThumbnail(e.target.files[0])}
            />

            <button className="form__button" type="submit">
              Upload
            </button>
          </CourseForm>
        ) : (
          <VideoForm onSubmit={uploadVideo} encType="multipart/form-data">
            <label className="form__label" htmlFor="title">
              Video Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              id="title"
              value={vTitle}
              onChange={(e) => setvTitle(e.target.value)}
            />

            <label className="form__label" htmlFor="description">
              Video Description
            </label>
            <input
              className="form__input"
              type="text"
              name="description"
              id="description"
              value={vDescription}
              onChange={(e) => setvDescription(e.target.value)}
            />

            <label className="form__label" htmlFor="subjectCode">
              Subject Code
            </label>
            <input
              className="form__input"
              type="number"
              name="subjectCode"
              id="subjectCode"
              value={vSubjectCode}
              onChange={(e) => setVSubjectCode(e.target.value)}
            />

            <label className="form__label" htmlFor="chapter">
              Chapter
            </label>
            <input
              className="form__input"
              type="number"
              name="chapter"
              id="chapter"
              value={vChapter}
              onChange={(e) => setVChapter(e.target.value)}
            />

            <label className="form__label" htmlFor="index">
              Index
            </label>
            <input
              className="form__input"
              type="number"
              name="index"
              id="index"
              value={vIndex}
              onChange={(e) => setVIndex(e.target.value)}
            />

            <label className="form__label" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              className="form__input"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setvThumbnail(e.target.files[0])}
            />

            <label className="form__label" htmlFor="video">
              Video
            </label>
            <input
              className="form__input"
              type="file"
              name="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />

            <button className="form__button" type="submit">
              Upload
            </button>
          </VideoForm>
        )}

        {vError && <Message status="error">{vError}</Message>}
        {vMessage && <Message status="success">{vMessage}</Message>}
        {cError && <Message status="error">{cError}</Message>}
        {cMessage && <Message status="success">{cMessage}</Message>}
      </FormContainer>
    </UploadSection>
  );
};

const UploadSection = styled.div`
  min-height: calc(100vh - 7.6rem);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }

  .form__label {
    font-size: 1.6rem;
    margin: 0.6rem 0;
  }

  .form__input {
    border: 0.1rem solid black;
    border-radius: 0.2rem;
    padding: 0.6rem;
    font-size: 1.6rem;
    outline: none;
  }

  .form__button {
    border: 0.1rem solid black;
    margin-top: 1.2rem;
    border-radius: 0.2rem;
    padding: 0.6rem;
    font-size: 1.6rem;
    background-color: var(--bg-light-secondary);
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.4rem;
    }

    .form__label,
    .form__input,
    .form__button {
      font-size: 1.4rem;
    }

    padding: 2rem;
  }
`;

const CourseForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const VideoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 1rem;
  width: 44rem;

  .form__changer {
    display: flex;
    justify-content: center;
    align-items: center;

    .form__changer-button {
      background-color: transparent;
      border: none;
      padding: 0.4rem 1rem;
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 1rem;

      &:first-child {
        border-right: 0.2rem solid black;
      }

      &:hover {
        cursor: pointer;
        color: var(--bg-light-secondary);
      }
    }

    .form__changer-active {
      color: var(--bg-light-secondary);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default UploadScreen;
