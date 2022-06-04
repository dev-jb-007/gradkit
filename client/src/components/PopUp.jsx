import React, { useState } from "react";
import styled from "styled-components/macro";

const PopUp = ({ content, status }) => {
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
          <PopUpContainer onClick={handleClick}>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgb(0, 0, 0, 0.4);
`;

const PopUpContainer = styled.div`
  width: 36rem;
  height: 24rem;
  z-index: 101;

  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;

  .popup__content {
  }

  button {
    margin-top: 1rem;
    border: none;
    background-color: var(--bg-light-secondary);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;

    &:hover {
      box-shadow: 0 0 0.4rem var(--bg-light-secondary);
    }
  }

  @media (max-width: 768px) {
    width: 24rem;
    height: 16rem;
  }
`;

export default PopUp;
