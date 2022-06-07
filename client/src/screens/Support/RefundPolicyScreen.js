import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

const RefundPolicyScreen = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Refund Policy</title>
        <meta
          name="description"
          content="Gradkit's Refund Policy, Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology Semester 4 courses"
        />
      </Helmet>

      <RefundContainer>
        <h1>RETURN POLICY</h1>
        <br />
        <h4> Last updated on 28th May 2022 </h4>
        <br />
        <h1>REFUNDS</h1>
        <br />
        <h4> ALL SALES ARE FINAL AND NO REFUND WILL BE ISSUED </h4>
        <br />
        <h1>QUESTIONS</h1>
        <br />
        <h4>
          if you have any questions regarding our return policy,please contact
          us at DOUBT.CO923@GMAIL.COM
        </h4>
      </RefundContainer>
    </>
  );
};

const RefundContainer = styled.div`
  min-height: calc(100vh - 7.6rem);
  padding: 2rem 4rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.6rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    padding: 2rem;

    h1 {
      font-size: 1.8rem;
    }

    h4 {
      font-size: 1.2rem;
    }
  }
`;

export default RefundPolicyScreen;
