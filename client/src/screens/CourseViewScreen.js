import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Loader, VideoTile } from "../components";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getCourseById } from "../redux/actions/courseActions";

import moment from "moment";

const CourseViewScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useNavigate();

  const { course } = useSelector((state) => state.course);

  const { isAuthenticatedUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticatedUser) {
      history("/signin");
    }
    dispatch(getCourseById(id));
  }, [dispatch, id, isAuthenticatedUser, history]);

  return (
    <CourseSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CourseDetails>
            <h3 className="course__title">{course?.title}</h3>

            <p className="course__description">{course?.description}</p>

            <p className="course__semister">Semister - {course?.semister}</p>

            <p className="course__subject__code">
              Subject Code - {course?.subjectCode}
            </p>

            <p className="course__date">
              Created at&nbsp;
              {moment(course?.createdAt).format("MMM Do YYYY")}&nbsp;
              {moment(course?.createdAt).format("h:mm a")}
            </p>
          </CourseDetails>

          <CoursePlaylist>
          {course?.videos &&
              course?.videos.map((video, index) => (
                <VideoTile video={video.videoId} id={course?._id} key={index} />
              ))}
          </CoursePlaylist>
        </>
      )}
    </CourseSection>
  );
};

const CourseSection = styled.div`
  min-height: calc(100vh - 7.6rem);
`;

const CourseDetails = styled.div`
  background-color: #171717;
  padding: 2rem 4rem;
  color: #bbbbbb;

  .course__title {
    font-size: 3.2rem;
    font-weight: 600;
  }

  .course__description {
    margin: 1.2rem 0;
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 400;
  }

  .course__subject__code,
  .course__semister,
  .course__date {
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0.6rem 0;
  }

  @media (max-width: 768px) {
    padding: 2rem;

    .course__title {
      font-size: 2.2rem;
    }

    .course__description {
      font-size: 1.6rem;
    }

    .course__subject__code,
    .course__semister,
    .course__date {
      font-size: 1.4rem;
    }
  }
`;

const CoursePlaylist = styled.div`
  padding: 2rem 4rem;

  /* background-color: yellow; */

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1.6rem;

  @media (max-width: 1160px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export default CourseViewScreen;
