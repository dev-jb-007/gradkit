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

const VerifyEmailScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useNavigate();

  const { message, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser(id));

    if (error) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }

    if (message) {
      setTimeout(() => dispatch(clearMessages()), 3000);

      if (message) {
        history("/");
      }
    }
  }, [dispatch, id, history, error, message]);

  return (
    <VerifySection>
      {loading && <Loader />}
      {message && <h2>{message}</h2>}
      {error && <h2>{error}</h2>}
    </VerifySection>
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

  button {
    width: 10rem;
    height: 3.6rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--bg-light-secondary);
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--font-light-secondary);

    &:hover {
      cursor: pointer;
    }
  }
`;

export default VerifyEmailScreen;
