import React from "react";
import AboutImg from "../../assets/atom.svg";
import styled from "styled-components/macro";

const AboutSection = () => {
  return (
    <About>
      <AboutContainer>
        <div className="image__container">
          <img src={AboutImg} alt="" />
        </div>
        <div className="text__container">
          <h1>About Us</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, quisquam.
          </p>
        </div>
      </AboutContainer>
    </About>
  );
};

const About = styled.div`
  min-height: calc(100vh - 7.6rem);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  border-radius: 0.4rem;
  height: 44rem;
  display: flex;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);

  .text__container {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 0.4rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.4rem;
      }
    }
  }

  .image__container {
    width: 100%;
    height: 100%;
    padding: 2rem;

    img {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 768px) {
    }
  }

  @media (max-width: 768px) {
    box-shadow: none;
  }
`;

export default AboutSection;
