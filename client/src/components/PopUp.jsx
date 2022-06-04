import React, { useState } from "react";
import styled from "styled-components/macro";

const PopUp = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {isOpen && (
        <PopUpWindow>
          <div className="overlay" onClick={handleClick}></div>
          <PopUpContainer>
            <div className="popup__content">
              <p>{content}</p>
            </div>
            <button onClick={handleClick}>Okay</button>
          </PopUpContainer>
        </PopUpWindow>
      )}
    </>
  );
};

const PopUpWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.4);
  }
`;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36rem;
  height: 24rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;

  .popup__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 3.4rem);
  }

  p {
    font-size: 1.6rem;
    font-weight: 600;
  }

  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    margin-top: 1rem;
    border: none;
    background-color: var(--bg-light-secondary);
    color: white;
    font-size: 1.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;

    &:hover {
      box-shadow: 0 0 0.4rem var(--bg-light-secondary);
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    width: 24rem;
    height: 16rem;

    p {
      font-size: 1.4rem;
    }
  }
`;

export default PopUp;
