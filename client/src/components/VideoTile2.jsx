import React from "react";
import styled from "styled-components/macro";

const VideoTile2 = () => {
  const img =
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthenewcode.com%2Fassets%2Fimages%2Fvanishing-point-2x.jpg&f=1&nofb=1";

  return (
    <VideoContainer>
      <img className="video__thumbnail" src={img} alt="" />

      <VideoDetails>
        <h4 className="video__title">
          Lorem ipsum dolor sit amet, conse adipisicing elit.
        </h4>

        <span className="video__uploader__name">Created By</span>

        <div className="">
          <span className="video__views">1M views</span>

          <span>&nbsp;|&nbsp;</span>

          <span className="video__time">1 year ago</span>
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default VideoTile2;
