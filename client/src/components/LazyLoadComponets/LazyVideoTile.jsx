import React from "react";
import styled from "styled-components/macro";

const LazyVideoTile = () => {
  return (
    <LazyVideoContainer>
      <div className="video__thumbnail"></div>

      <LazyVideoDetails>
        <div>
          <div className="video__title"></div>

          <div className="video__description"></div>

          <div className="video__date__time"></div>
        </div>
      </LazyVideoDetails>
    </LazyVideoContainer>
  );
};

const LazyVideoContainer = styled.div`
  @keyframes fadeIn {
    0% {
      background-color: #e6e6e6;
    }

    100% {
      background-color: #f2f2f2;
    }
  }

  .video__thumbnail {
    width: 100%;
    height: 18rem;
    background-color: #e6e6e6;

    animation: fadeIn 500ms linear infinite alternate;

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

const LazyVideoDetails = styled.div`
  display: flex;
  margin-top: 1rem;

  @keyframes fadeIn {
    0% {
      background-color: #e6e6e6;
    }

    100% {
      background-color: #f2f2f2;
    }
  }

  .video__date__time {
    background-color: #e6e6e6;
    height: 1.25rem;
    width: 10rem;
    animation: fadeIn 500ms linear infinite alternate;
  }

  .video__title {
    background-color: #e6e6e6;
    height: 1.6rem;
    width: 18rem;
    animation: fadeIn 500ms linear infinite alternate;
  }

  .video__description {
    background-color: #e6e6e6;
    margin: 0.2rem 0 0.6rem;
    height: 1.4rem;
    width: 22rem;
    animation: fadeIn 500ms linear infinite alternate;
  }

  @media (max-width: 1160px) {
    .video__title {
      width: 18rem;
    }

    .video__description {
      width: 22rem;
    }
  }

  @media (max-width: 768px) {
    .video__title {
      width: 16rem;
    }

    .video__description {
      width: 20rem;
    }
  }

  @media (max-width: 576px) {
    .video__title {
      width: 14rem;
    }

    .video__description {
      width: 24rem;
    }

    .video__date__time {
      width: 10rem;
    }
  }
`;

export default LazyVideoTile;
