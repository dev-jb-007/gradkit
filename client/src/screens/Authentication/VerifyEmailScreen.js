import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessages,
  verifyUser,
} from "../../redux/actions/userActions";
import { Loader } from "../../components";
import { Helmet } from "react-helmet";

const VerifyEmailScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useNavigate();

  const { message, loading, error } = useSelector((state) => state.user);

  const verify = () => {
    dispatch(verifyUser(id));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearErrors()), 1500);
    }

    if (message) {
      setTimeout(() => dispatch(clearMessages()), 1500);

      setTimeout(() => history("/signin"), 3000);
    }
  }, [dispatch, id, history, error, message]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Email</title>
        <meta
          name="description"
          content="Gradkit's Email verification page, Verify your email to explore all courses provided by Gradkit. Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology Semester 4 courses"
        />
      </Helmet>

      <VerifySection>
        {loading && <Loader />}
        <h2>Click on button to verify email</h2>
        <button onClick={verify}>Verify</button>

        {message && <h3 className="success">{message}</h3>}
        {error && <h3 className="error">{error}</h3>}
      </VerifySection>
    </>
  );
};

const VerifySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 7.6rem);

  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
  }

  .success {
    color: rgb(21 128 61);
  }

  .error {
    color: rgb(185 28 28);
  }

  button {
    width: 10rem;
    height: 3.6rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--bg-light-secondary);
    font-size: 1.6rem;
    font-weight: 500;
    /* color: var(--font-light-secondary); */
    color: white;

    &:hover {
      box-shadow: 0 0 0.4rem var(--bg-light-secondary);
      cursor: pointer;
    }
  }
`;

export default VerifyEmailScreen;
