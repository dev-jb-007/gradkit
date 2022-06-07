import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
// import Logo from "../../assets/logo.svg";
// import SignImg from "../../assets/atom.svg";

import { useDispatch, useSelector } from "react-redux";

import {
  resetPassword,
  clearErrors,
  clearMessages,
} from "../../redux/actions/userActions";

import { useNavigate, useParams } from "react-router-dom";
import { Loader, Message } from "../../components";
import { Helmet } from "react-helmet";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const history = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();

  const resetPass = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password));
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }

    if (message) {
      setTimeout(() => dispatch(clearMessages()), 3000);
      setTimeout(() => history("/signin"), 4000);
    }
  }, [error, dispatch, message, history]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <meta
          name="description"
          content="Gradkit's Reset password page. Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology semester 4 courses"
        />
      </Helmet>

      <ResetPassSection>
        {loading ? (
          <Loader />
        ) : (
          <ResetPassContainer>
            <div className="image__container">
              <img
                src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/atom.svg"
                alt=""
              />
            </div>
            <div className="form__container">
              <form onSubmit={resetPass}>
                <img
                  src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/logo.svg"
                  alt="gradkit"
                  className="form__logo"
                />
                <h1>Reset Password</h1>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="form__button">
                  Reset
                </button>
                {message && <Message status="success">{message}</Message>}
                {error && <Message status="error">{error}</Message>}
              </form>
            </div>
          </ResetPassContainer>
        )}
      </ResetPassSection>
    </>
  );
};
export default ResetPasswordScreen;

const ResetPassSection = styled.div`
  height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ResetPassContainer = styled.div`
  width: 100%;
  border-radius: 0.4rem;
  height: 44rem;
  display: flex;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);

  .form__container {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      /* background-color: yellow; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 32rem;
    }

    .form__logo {
      width: 24rem;
      margin-bottom: 3.6rem;
    }

    h1 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 0.4rem;
    }

    label {
      font-size: 1.6rem;
      margin: 0.6rem 0;
    }

    input {
      border: 0.1rem solid black;
      border-radius: 0.2rem;
      padding: 0.6rem;
      font-size: 1.6rem;
      outline: none;
    }

    .form__button {
      background-color: var(--bg-light-secondary);
      padding: 0.6rem 0;
      width: 10rem;
      border: none;
      border-radius: 0.4rem;
      font-size: 1.6rem;
      color: white;
      margin-top: 1rem;

      &:hover {
        box-shadow: 0 0 0.4rem var(--bg-light-secondary);
        cursor: pointer;
      }
    }

    @media (max-width: 768px) {
      .form__logo {
        width: 16rem;
      }

      h1 {
        font-size: 2.4rem;
      }

      label {
        font-size: 1.4rem;
      }

      input {
        font-size: 1.4rem;
      }

      .form__button {
        width: 10rem;
        font-size: 1.4rem;
      }

      .form__links {
        font-size: 1.4rem;
      }
    }
  }

  .image__container {
    width: 100%;
    height: 100%;
    /* background-color: pink; */
    padding: 2rem;

    img {
      width: 100%;
      height: 100%;
      /* background-color: green; */
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    box-shadow: none;
  }
`;
