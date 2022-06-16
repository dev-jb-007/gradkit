import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Loader } from "../components";
import { LazyVideoTile } from "../components/LazyLoadComponets";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getCourseById } from "../redux/actions/courseActions";

import moment from "moment";
import { Helmet } from "react-helmet";

const VideoTile = lazy(() => import("../components/VideoTile"));

const CourseViewScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useNavigate();

  const { course } = useSelector((state) => state.course);

  const { isAuthenticatedUser, loading } = useSelector((state) => state.user);

  function handleClick() {
    history("/course");
  }

  useEffect(() => {
    if (loading === undefined) {
    } else if (!loading && !isAuthenticatedUser) {
      history("/signin");
    }
    dispatch(getCourseById(id));
  }, [dispatch, id, isAuthenticatedUser, history, loading]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{course?.title}</title>
        <meta name="description" content={course?.description} />
      </Helmet>

      <CourseSection>
        {loading ? (
          <Loader />
        ) : (
          <>
            <CourseDetails>
              <div
                className={`course__info ${
                  course && course?.videos?.length <= 4 ? "course__locked" : ""
                }`}
              >
                <h3 className="course__title">{course?.title}</h3>

                <div className="course__description">
                  {course?.description?.split("\n").map((str, index) => (
                    <p key={index}>{str}</p>
                  ))}
                </div>

                <p className="course__semister">
                  Semester - {course?.semister}
                </p>

                <p className="course__subject__code">
                  Subject Code - {course?.subjectCode}
                </p>
                <p className="course__videos__number">
                  {course?.videos?.length} videos
                </p>

                <p className="course__date">
                  Created at&nbsp;
                  {moment(course?.createdAt).format("MMM Do YYYY")}&nbsp;
                  {moment(course?.createdAt).format("h:mm a")}
                </p>

                <a
                  href="https://drive.google.com/drive/folders/1H70JwXbBZRC_s1fH8tiSC4Zk_Y2PMC3M?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resources__link"
                >
                  <span>Resources</span>
                </a>
              </div>
              {course && course?.videos?.length <= 4 && (
                <div className="lock__container">
                  <img
                    src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/lock-100.svg"
                    className="lock__icon"
                    alt="lock-icon"
                  />
                  <p className="lock__text">Buy to access all videos</p>
                  <button className="lock__button" onClick={handleClick}>
                    Buy Now
                  </button>
                </div>
              )}
            </CourseDetails>

            <CoursePlaylist>
              {course?.videos &&
                course?.videos.map((video, index) => (
                  <Suspense key={index} fallback={<LazyVideoTile />}>
                    <VideoTile
                      video={video?.videoId}
                      id={course?._id}
                      key={index}
                    />
                  </Suspense>
                ))}
            </CoursePlaylist>
          </>
        )}
      </CourseSection>
    </>
  );
};

const CourseSection = styled.div`
  min-height: calc(100vh - 7.6rem);
`;

const CourseDetails = styled.div`
  background-color: #171717;
  padding: 2rem 4rem;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .resources__link {
    display: inline-block;
    background: var(--bg-light-secondary);
    border: none;
    color: white;
    padding: 0.4rem 0.8rem;
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 0.6rem;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;

    &:hover {
      box-shadow: 0 0 0.4rem var(--bg-light-secondary);
    }
  }

  .course__info {
    width: 100%;
    .course__title {
      font-size: 3.2rem;
      font-weight: 600;
    }

    .course__description {
      margin: 1.2rem 0;
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 400;
      line-height: 2rem;
    }

    .course__subject__code,
    .course__semister,
    .course__videos__number,
    .course__date {
      font-size: 1.6rem;
      font-weight: 400;
      margin: 0.6rem 0;
    }
  }

  .lock__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    right: 4rem;

    .lock__icon {
      width: 12rem;
      height: 12rem;
    }

    .lock__text {
      font-size: 1.4rem;
      font-weight: 400;
      margin: 0.6rem 0;
    }

    .lock__button {
      font-size: 1.4rem;
      font-weight: 400;
      padding: 0.4rem;
      border-radius: 0.4rem;
      background-color: var(--bg-light-secondary);
      color: white;
      border: none;
      box-shadow: none;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 0.4rem var(--bg-light-secondary);
      }
    }
  }

  .course__locked {
    width: 80%;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    .course__locked {
      width: 70%;
    }

    .course__info {
      .course__title {
        font-size: 2.2rem;
      }

      .course__description {
        font-size: 1.6rem;
      }

      .course__subject__code,
      .course__videos__number,
      .course__semister,
      .course__date,
      .resources__link {
        font-size: 1.4rem;
      }
    }

    .lock__container {
      right: 2rem;

      .lock__icon {
        width: 6rem;
        height: 6rem;
      }

      .lock__text {
        font-size: 1.2rem;
      }

      .lock__button {
        font-size: 1.2rem;
      }
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
