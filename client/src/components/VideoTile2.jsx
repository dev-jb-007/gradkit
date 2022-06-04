import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Link } from "react-router-dom";

const VideoTile2 = ({ video, id }) => {
  console.log(video);

  return (
    <VideoContainer>
      <Link to={`/video/${video._id}/${id}`}>
        <img className="video__thumbnail" src={video.thumbnail} alt="" />
      </Link>

      <VideoDetails>
        <h4 className="video__title">
          <Link to={`/video/${video._id}/${id}`}>{video.videoTitle}</Link>
        </h4>

        <p className="video__description">
          {video?.videoDescription.length > 64
            ? video?.videoDescription.substring(0, 64) + "..."
            : video?.videoDescription}
        </p>

        <div className="">
          <span className="video__date">
            {moment(video?.createdAt).format("Do MMM YYYY")}
          </span>

          <span>&nbsp;|&nbsp;</span>

          <span className="video__time">
            {moment(video?.createdAt).format("h:mm a")}
          </span>
        </div>
      </VideoDetails>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  margin-bottom: 1rem;

  .video__thumbnail {
    width: 16.8rem;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const VideoDetails = styled.div`
  margin-left: 1rem;
  width: 22.6rem;

  span {
    font-size: 1.2rem;
    color: #797979;
    font-weight: 600;
  }

  .video__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--font-dark-primary);
    margin-bottom: 0.8rem;
  }

  .video__description {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0.2rem 0 0.6rem;
    color: #171717;
  }

  @media (max-width: 768px) {
    width: 100%;
    .video__description {
      font-size: 1.2rem;
    }
  }
`;

export default VideoTile2;
