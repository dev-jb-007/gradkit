import React from "react";
import styled from "styled-components/macro";

const AboutSection = () => {
  return (
    <About id="#about">
      <AboutContainer>
        <div className="image__container">
          <img
            src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/about.svg"
            alt=""
          />
        </div>
        <div className="text__container">
          <h1>About Us</h1>

          <br />

          <p>
            We are here to make your university exam preparation efficient as
            well as smooth. We are an SSIP funded project.
          </p>

          <br />

          <p>
            Our team consists of developers and teachers: Krishna Kalani, Bhagya
            Patel, Kritik Jiyaviya, Dev Patel, Jay Rathi, Nishant Asnani, Rahul
            Shinde, Rohit Sharma. Get knowledgeable with us, thankyou.
          </p>
        </div>
      </AboutContainer>
    </About>
  );
};

const About = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
  border-bottom: 0.4rem solid #aaaa;

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
