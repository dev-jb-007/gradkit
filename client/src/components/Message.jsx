import React from "react";
import styled from "styled-components/macro";

const Message = ({ children, status }) => {
  return (
    <MessageContainer>
      <div
        className={`message 
        ${status} === "success" ? "success" : ""}
        ${status} === "error" ? "error" : ""}
        ${status} === "info" ? "info" : ""}
      `}
        // role="alert"
      >
        {children}
      </div>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  width: 100%;

  .message {
    padding: 0.8rem;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    margin-top: 0.8rem;
  }

  .success {
    color: rgb(21 128 61);
    background: rgb(220 252 231);
  }

  .error {
    color: rgb(185 28 28);
    background: rgb(254 226 226);
  }

  .info {
    color: rgb(29 78 216);
    background: rgb(219 234 254);
  }
`;

export default Message;
