import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { VideoPlayer } from "../components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";

const HomeScreen = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
  // ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.send("pageview");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gradkit</title>
        <meta
          name="description"
          content="Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology semester 4 courses"
        />
      </Helmet>
      <WelcomeSection>
        <HeroTextContainer>
          <h1>
            Make Learning fun <br /> with&nbsp;
            <span className="logo">gradkit</span>
          </h1>
          <p>Explore all courses</p>
          <Link to="/course">
            <button>Explore</button>
          </Link>
        </HeroTextContainer>

        <HeroImageContainer>
          <img
            src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/homepage.svg"
            alt="home-img"
          />
        </HeroImageContainer>
      </WelcomeSection>

      <OverviewSection>
        <h2 className="second__header">WHAT DO WE PROVIDE?</h2>

        <OverviewContainer>
          <div className="overview__video">
            <VideoPlayer url="https://youtu.be/IVi0XrT2h4A" />
          </div>
          <div className="overview__text">
            <h3>Create</h3>
            <p>
              To make your preparation easy for the upcoming exams of Semester 4
              GTU IT/CS subjects We provide courses that will clear all the
              concepts, help in logic building and doubt-solving.
            </p>
          </div>
        </OverviewContainer>
      </OverviewSection>
    </>
  );
};

const WelcomeSection = styled.div`
  position: relative;
  min-height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 8rem;

  @media (max-width: 768px) {
    height: 100%;
    justify-content: center;
    flex-direction: column-reverse;
    padding: 2rem;
  }
`;

const HeroTextContainer = styled.div`
  h1 {
    font-size: 4.8rem;
    line-height: 5.6rem;

    .logo {
      color: var(--bg-light-secondary);
    }
  }

  p {
    margin: 1.5rem 0 2rem;
    font-size: 3rem;
  }

  button {
    margin-right: 1rem;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    color: black;
    background: transparent;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
  }

  @media (max-width: 1160px) {
    h1 {
      font-size: 3.6rem;
      line-height: 4.4rem;
    }

    p {
      font-size: 2.4rem;
      margin: 0.8rem 0;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
      line-height: 3.6rem;
    }

    p {
      font-size: 2rem;
    }
  }
`;

const HeroImageContainer = styled.div`
  img {
    width: 48rem;

    @media (max-width: 1160px) {
      width: 40rem;
    }

    @media (max-width: 768px) {
      width: 32rem;
      margin-bottom: 1.4rem;
    }

    @media (max-width: 500px) {
      width: 28rem;
      margin-bottom: 1.4rem;
    }
  }
`;

const OverviewSection = styled.div`
  padding: 4rem 8rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fafafa;

  .second__header {
    font-size: 3.2rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    .second__header {
      font-size: 2.6rem;
    }
  }
`;

const OverviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6rem;

  .overview__video {
    width: 54rem;
    margin-right: 4rem;
  }

  .overview__text {
    width: 50%;

    h3 {
      font-size: 2.4rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .overview__video {
      width: 100%;
      margin-right: 0;
    }

    .overview__text {
      width: 100%;
      padding: 0;
      margin-top: 2rem;

      h3 {
        font-size: 2rem;
      }

      p {
        font-size: 1.4rem;
      }
    }
  }
`;

export default HomeScreen;
