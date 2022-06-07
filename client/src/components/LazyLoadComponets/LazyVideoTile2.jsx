import React from "react";
import styled from "styled-components/macro";

const LazyVideoTile2 = () => {
  return (
    <LazyVideoContainer>
      <div className="video__thumbnail"></div>

      <LazyVideoDetails>
        <div className="video__title"></div>

        <div className="video__description"></div>
        <div className="video__description"></div>

        <div className="video__date__time"></div>
      </LazyVideoDetails>
    </LazyVideoContainer>
  );
};

const LazyVideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  margin-bottom: 1rem;

  @keyframes fadeIn {
    0% {
      background-color: #e6e6e6;
    }

    100% {
      background-color: #f2f2f2;
    }
  }

  .video__thumbnail {
    width: 16.8rem;
    height: 100%;
    background-color: #e6e6e6;

    animation: fadeIn 500ms linear infinite alternate;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const LazyVideoDetails = styled.div`
  margin-left: 1rem;
  max-width: 22.6rem;

  @keyframes fadeIn {
    0% {
      background-color: #e6e6e6;
    }

    100% {
      background-color: #f2f2f2;
    }
  }

  .video__date__time {
    margin-top: 0.4rem;
    width: 10rem;
    height: 1.2rem;
    background-color: #e6e6e6;
    animation: fadeIn 500ms linear infinite alternate;
  }

  .video__title {
    width: 16rem;
    height: 1.6rem;
    background-color: #e6e6e6;
    margin-bottom: 0.8rem;
    animation: fadeIn 500ms linear infinite alternate;
  }

  .video__description {
    width: 20rem;
    height: 1.3rem;
    margin: 0.2rem 0;
    background-color: #e6e6e6;
    animation: fadeIn 500ms linear infinite alternate;
  }

  @media (max-width: 768px) {
    .video__title {
      width: 12rem;
    }

    .video__description {
      width: 16rem;
      height: 1.2rem;
    }

    .video__date__time {
      width: 8rem;
    }
  }
`;

export default LazyVideoTile2;
