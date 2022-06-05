import React, { useEffect } from "react";
import Linkify from "react-linkify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Loader, VideoPlayer, VideoTile2 } from "../components";
import {
  getVideoDetails,
  clearVideoErrors,
} from "../redux/actions/videoActions";
import { getCourseById } from "../redux/actions/courseActions";
import { useNavigate } from "react-router-dom";

const VideoPlayerScreen = () => {
  const { vid, cid } = useParams();

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
      history("/signin")
    }

    dispatch(clearVideoErrors());
  }, [dispatch, cid, vid, error, history, loading, isAuthenticatedUser]);

  return (
    <VideoContainer>
      {vLoading ? (
        <Loader />
      ) : (
        <>
          <VideoWrapper>
            <div>
              <VideoPlayer url={video?.videoURL} />
            </div>

            <VideoDetails>
              <h3 className="video__title">{video?.videoTitle}</h3>
            <Linkify>
              <p className="video__description">{video?.videoDescription?.split('\n').map(str => <p >{str}</p>)}</p>
            </Linkify>
            </VideoDetails>
          </VideoWrapper>

          <VideoPlaylist>
            <h3 className="related__video-header">{course?.title} -</h3>
            {course?.videos &&
              course?.videos.map((video, index) => (
                <VideoTile2
                  video={video.videoId}
                  key={index}
                  id={course?._id}
                />
              ))}
          </VideoPlaylist>
        </>
      )}
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  padding: 2rem 4rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 7.6rem);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const VideoWrapper = styled.div`
  max-width: 85.4rem;
  width: 100%;
`;

const VideoDetails = styled.div`
  padding: 1.4rem 0;
  color: var(--font-light-primary);

  a{
    color:blue;
  }

  .video__title {
    font-weight: 600;
    font-size: 2rem;
  }

  .video__description {
    font-size: 1.4rem;
    margin-top: 0.4rem;
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

  .related__video-header {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.4rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;

    .related__video-header {
      font-size: 1.8rem;
      margin: 1.4rem 0;
    }
  }
`;

export default VideoPlayerScreen;
