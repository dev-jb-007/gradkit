import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

const MaintainanceScreen = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Maintainance - We're working on it</title>
        <meta name="description" content="Maintainance | We're working on it" />
      </Helmet>
      <MaintainanceContainer>
        <img
          src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/maintainance.svg"
          alt="maintinance"
        />

        <h1>Website is under maintainance.</h1>
        <p>We'll be back soon</p>
      </MaintainanceContainer>
    </>
  );
};

const MaintainanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 7.6rem);
  padding: 2rem 8rem;

  img {
    width: 36rem;
  }

  h1 {
    font-size: 3.6rem;
    margin: 1.6rem 0;
    color: var(--bg-light-secondary);
  }

  p {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    img {
      width: 30rem;
    }
    padding: 0 2rem;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.6rem;
    }
  }
`;

export default MaintainanceScreen;
