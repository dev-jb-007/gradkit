import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Loading>
      <div className="load"></div>
    </Loading>
  );
};

const Loading = styled.div`
  position: absolute;
  top: 7.6rem;
  left: 0;
  width: 100%;
  height: 0.5rem;
  z-index: -1;

  .load {
    position: absolute;
    top: 0;
    left: 0;
    width: 8rem;
    height: 100%;
    background-color: var(--bg-light-secondary);
    animation: load 1.5s linear infinite;

    @keyframes load {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(calc(100vw - 10rem));
      }
    }
  }
`;

export default Loader;
