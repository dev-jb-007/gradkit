import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignInButton from "../../components/GoogleSignInButton";

import {
  login,
  clearErrors,
  clearMessages,
} from "../../redux/actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { Loader, Message } from "../../components";
import { Helmet } from "react-helmet";

const SigninScreen = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticatedUser, loading, message } = useSelector(
    (state) => state.user
  );

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }

    if (message) {
      setTimeout(() => dispatch(clearMessages()), 3000);
    }

    if (isAuthenticatedUser) {
      history("/");
    }
  }, [dispatch, error, isAuthenticatedUser, history, message]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signin</title>
        <meta
          name="description"
          content="Gradkit's Sign in page, Sign in to explore all courses provided by Gradkit. Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology Semester 4 courses"
        />
      </Helmet>
      <SignInSection>
        {loading && <Loader />}
        <SignInContainer>
          <div className="form__container">
            <form onSubmit={userSignin}>
              <img
                src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/logo.svg"
                alt="gradkit"
                className="form__logo"
              />

              <h1>Sign In</h1>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="form__button">
                Sign In
              </button>

              <div className="form__links">
                <Link to="/signup">Not Registered?</Link>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="signout__link">
                <Link to="/signout-all">Sign Out From All Devices</Link>
              </div>

              <OrConatainer>
                <p>OR</p>
              </OrConatainer>
              <GoogleButton>
                <GoogleSignInButton />
              </GoogleButton>

              {message && <Message status="success">{message}</Message>}
              {error && <Message status="error">{error}</Message>}
            </form>
          </div>
          <div className="image__container">
            <img
              src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/login.svg"
              alt="login-img"
            />
          </div>
        </SignInContainer>
      </SignInSection>
    </>
  );
};

const SignInSection = styled.div`
  min-height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SignInContainer = styled.div`
  width: 100%;
  border-radius: 0.4rem;
  height: 48rem;
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

    .check__container {
      display: flex;
      align-items: center;

      input {
        margin-right: 0.8rem;
      }
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
      font-size: 1.6rem;
      font-weight: 500;
      margin: 1rem 0;

      a {
        &:hover {
          color: var(--bg-light-secondary);
        }
      }
    }

    .signout__link {
      display: flex;
      align-items: center;
      justify-content: center;
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

      .form__links,
      .signout__link {
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

const OrConatainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  &:before,
  &:after {
    flex: 1;
    content: "";
    border-top: 0.2rem solid #cccccc;
    margin-top: 0.2rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    p {
      font-size: 1.4rem;
    }
  }
`;

export default SigninScreen;
