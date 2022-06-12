import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
// import NotFound from ".././assets/not-found.svg";

const Error404Screen = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error - 404</title>
        <meta name="description" content="Error - 404 | Page not found" />
      </Helmet>
      <Error>
        <img
          src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/not-found.svg
"
          alt="error-404"
        />

        <h1>Page not found</h1>
        <Link to="/" className="goback__link">
          Go to Home
        </Link>
      </Error>
    </>
  );
};

const Error = styled.div`
  position: relative;
  min-height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 8rem;

  img {
    width: 36rem;
  }

  h1 {
    font-size: 3.6rem;
    margin: 1.5rem 0 2rem;
    color: var(--bg-light-secondary);
  }

  .goback__link {
    font-size: 1.8rem;
    color: var(--font-light-primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: var(--bg-light-secondary);
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;

    img {
      width: 30rem;
    }

    h1 {
      font-size: 2.2rem;
    }

    .goback__link {
      font-size: 1.4rem;
    }
  }
`;

export default Error404Screen;
