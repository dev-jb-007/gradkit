import React, { useState } from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { createVideo } from "../redux/actions/videoActions";
import { createCourse } from "../redux/actions/courseActions";

const UploadScreen = () => {
  const dispatch = useDispatch();

  const [cTitle, setCTitle] = useState(
    "Computer Organization and Architecture"
  );

  const [cDescription, setCDescription] = useState(
    "    This course is designed to teach students the fundamentals of computer organization and architecture."
  );

  const [cSubjectCode, setCSubjectCode] = useState("394565");
  const [cPrice, setCPrice] = useState("59");
  const [cSemister, setCSemister] = useState("4");
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
  };

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
  };

  return (
    <UploadSection>
      {/* Course Upload */}

      <CourseForm onSubmit={uploadCourse} encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={cTitle}
          onChange={(e) => setCTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={cDescription}
          onChange={(e) => setCDescription(e.target.value)}
        />
        <label htmlFor="subjectCode">Subject Code</label>
        <input
          type="number"
          name="subjectCode"
          id="subjectCode"
          value={cSubjectCode}
          onChange={(e) => setCSubjectCode(e.target.value)}
        />

        <label htmlFor="semister">Semister</label>
        <input
          type="text"
          name="semister"
          id="semister"
          value={cSemister}
          onChange={(e) => setCSemister(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          value={cPrice}
          onChange={(e) => setCPrice(e.target.value)}
        />

        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setCThumbnail(e.target.files[0])}
        />

        <input type="submit" value="Upload" />
      </CourseForm>

      {/* Video Upload */}

      <VideoForm onSubmit={uploadVideo} encType="multipart/form-data">
        <label htmlFor="title">Video Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={vTitle}
          onChange={(e) => setvTitle(e.target.value)}
        />

        <label htmlFor="description">Video Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={vDescription}
          onChange={(e) => setvDescription(e.target.value)}
        />

        <label htmlFor="subjectCode">Subject Code</label>
        <input
          type="number"
          name="subjectCode"
          id="subjectCode"
          value={vSubjectCode}
          onChange={(e) => setVSubjectCode(e.target.value)}
        />

        <label htmlFor="chapter">Chapter</label>
        <input
          type="number"
          name="chapter"
          id="chapter"
          value={vChapter}
          onChange={(e) => setVChapter(e.target.value)}
        />

        <label htmlFor="index">Index</label>
        <input
          type="number"
          name="index"
          id="index"
          value={vIndex}
          onChange={(e) => setVIndex(e.target.value)}
        />

        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setvThumbnail(e.target.files[0])}
        />

        <label htmlFor="video">Video</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </VideoForm>
    </UploadSection>
  );
};

const UploadSection = styled.div`
  min-height: calc(100vh - 7.6rem);
`;

const CourseForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const VideoForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 4rem;
`;

export default UploadScreen;
