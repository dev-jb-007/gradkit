import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
// import Logo from "../../assets/logo.svg";
// import SignImg from "../../assets/atom.svg";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  clearMessages,
  forgotPassword,
} from "../../redux/actions/userActions";
import { Loader, Message } from "../../components";
import { Helmet } from "react-helmet";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const dispatch = useDispatch();

  const history = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPass = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
    setConfirmEmail("");
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
        <title>Forgot Password</title>
        <meta
          name="description"
          content="Gradkit's Forgot password page. Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology Semester 4 courses"
        />
      </Helmet>

      <ForgotPassSection>
        {loading ? (
          <Loader />
        ) : (
          <ForgotPassContainer>
            <div className="form__container">
              <form onSubmit={forgotPass}>
                <img
                  src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/logo.svg"
                  alt="gradkit"
                  className="form__logo"
                />

                <h1>Forgot Password</h1>

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="confirm-email">Confirm Email</label>
                <input
                  type="email"
                  id="confirm-email"
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                />

                <button type="submit" className="form__button">
                  Send
                </button>

                <div className="form__links">
                  <Link to="/signin">Sign In</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
                {message && <Message status="success">{message}</Message>}
                {error && <Message status="error">{error}</Message>}
              </form>
            </div>
            <div className="image__container">
              <img
                src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/atom.svg"
                alt=""
              />
            </div>
          </ForgotPassContainer>
        )}
      </ForgotPassSection>
    </>
  );
};

const ForgotPassSection = styled.div`
  min-height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ForgotPassContainer = styled.div`
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
      width: 18rem;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2.4rem;
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

    .form__links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 500;

      a {
        &:hover {
          color: var(--bg-light-secondary);
        }
      }
    }

    @media (max-width: 768px) {
      .form__logo {
        width: 14rem;
      }

      h1 {
        font-size: 2rem;
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

export default ForgotPasswordScreen;
