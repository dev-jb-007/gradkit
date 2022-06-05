import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const VideoTile = ({ video, id }) => {
  return (
    <VideoContainer>
      <Link to={`/video/${video._id}/${id}`}>
        <img className="video__thumbnail" src={video.thumbnail} alt="" />
      </Link>

      <VideoDetails>
        {/* <img src={img} alt="" className="video__uploader__image" /> */}

        <div>
          <h4 className="video__title">
            <Link to={`/video/${video._id}/${id}`}>{video?.videoTitle}</Link>
          </h4>

          <p className="video__description">
            {video?.videoDescription.length > 64
              ? video?.videoDescription.substring(0, 64) + "..."
              : video?.videoDescription}
          </p>

          {/* <span className="video__uploader__name">Created By</span> */}

          <div className="">
            <span className="video__date">
              {moment(video?.createdAt).format("Do MMM YYYY")}
            </span>

            <span>&nbsp;|&nbsp;</span>

            <span className="video__time">
              {moment(video?.createdAt).format("h:mm a")}
            </span>
          </div>
        </div>
      </VideoDetails>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  border-radius: 0.4rem;

  .video__thumbnail {
    width: 100%;
    height: 18rem;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .video__thumbnail {
      height: 20rem;
    }
  }
`;

const VideoDetails = styled.div`
  display: flex;
  margin-top: 1rem;

  .video__uploader__image {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    margin-right: 1.2rem;
    object-fit: cover;
  }

  span {
    font-size: 1.2rem;
    color: #797979;
    font-weight: 600;
  }

  .video__title {
    color: black;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .video__description {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0.2rem 0 0.6rem;
    color: #171717;
  }

  @media (max-width: 768px) {
    .video__title {
      font-size: 1.4rem;
    }

    .video__description {
      font-size: 1.2rem;
    }

    span {
      font-size: 1.125rem;
    }
  }
`;

export default VideoTile;
