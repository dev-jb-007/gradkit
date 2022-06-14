import React, { useEffect, useState, lazy, Suspense } from "react";
import Linkify from "react-linkify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Loader, VideoPlayer } from "../components";
import {
  getVideoDetails,
  clearVideoErrors,
} from "../redux/actions/videoActions";
import { getCourseById } from "../redux/actions/courseActions";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LazyVideoTile2 } from "../components/LazyLoadComponets";

const VideoTile2 = lazy(() => import("../components/VideoTile2"));

const VideoPlayerScreen = () => {
  const { vid, cid } = useParams();

  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
    showDescription ? setShowDescription(false) : setShowDescription(true);
  };

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { isAuthenticatedUser, loading } = useSelector((state) => state.user);

  const { video, vLoading, error } = useSelector((state) => state.video);

  const history = useNavigate();

  useEffect(() => {
    dispatch(getVideoDetails(vid, cid));
    dispatch(getCourseById(cid));

    if (error) {
      history(`/course/${cid}`);
    }

    if (loading === undefined) {
    } else if (!loading && !isAuthenticatedUser) {
      history("/signin");
    }

    dispatch(clearVideoErrors());
  }, [dispatch, cid, vid, error, history, loading, isAuthenticatedUser]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${video?.videoTitle}`}</title>
        <meta name="description" content={`${video?.videoDescription}`} />
      </Helmet>

      <Video>
        {vLoading ? (
          <Loader />
        ) : (
          <VideoContainer>
            <VideoWrapper>
              <div>
                <VideoPlayer url={video?.videoURL} />
              </div>

              <VideoDetails>
                <h3 className="video__title">{video?.videoTitle}</h3>

                <div className="video__description">
                  {showDescription ? (
                    <span className="description__button" onClick={showDescriptionHandler}>
                      Hide Description
                    </span>
                  ) : (
                    <span className="description__button" onClick={showDescriptionHandler}>
                      Show Description
                    </span>
                  )}

                  {showDescription && (
                    <Linkify>
                      <div className="video__description-wrapper">
                        {video?.videoDescription?.split("\n").map((str) => (
                          <p>{str}</p>
                        ))}
                      </div>
                    </Linkify>
                  )}
                </div>
              </VideoDetails>
            </VideoWrapper>

            <VideoPlaylist>
              <h3 className="related__video-header">{course?.title} -</h3>
              {course?.videos &&
                course?.videos.map((video, index) => (
                  <Suspense fallback={<LazyVideoTile2 />} key={index}>
                    <VideoTile2
                      video={video.videoId}
                      key={index}
                      id={course?._id}
                    />
                  </Suspense>
                ))}
            </VideoPlaylist>
          </VideoContainer>
        )}
      </Video>
    </>
  );
};

const Video = styled.div`
  padding: 2rem 4rem;
  width: 100%;
  min-height: calc(100vh - 7.6rem);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;
const VideoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const VideoWrapper = styled.div`
  max-width: 85.4rem;
  width: 100%;
  height: 100%;
  top: 2rem;
  left: 0;
  position: sticky;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
  }
`;

const VideoDetails = styled.div`
  padding: 1.4rem 0;
  color: var(--font-light-primary);

  a {
    color: blue;
  }

  .video__title {
    font-weight: 600;
    font-size: 2rem;
  }

  .video__description {
    font-size: 1.4rem;
    margin-top: 0.5rem;
    
    /* .description__button {
    } */

    span {
      font-size: 1.2rem;
      &:hover {
        cursor: pointer;
      }
    }

    .video__description-wrapper {
      line-height: 1.8rem;
      margin-top: 1rem;
    }
  }

  @media (max-width: 768px) {
    border-bottom: 0.2rem solid #e6e6e6;
    .video__title {
      font-size: 1.6rem;
    }
  }
`;

// const VideoStats = styled.div``;

const VideoPlaylist = styled.div`
  margin-left: 2rem;
  height: 100%;

  .related__video-header {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.4rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;

    .related__video-header {
      font-size: 1.8rem;
      margin: 1.4rem 0;
    }
  }
`;

export default VideoPlayerScreen;
