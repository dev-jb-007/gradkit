import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";


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


  
  /* google login */

  const googleSuccess = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());

    var id_token = googleUser.getAuthResponse().id_token;

    await fetch("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile, id_token }),
    });

    // let ans = await buffer.json();
  };

  const googleFailure = () => {
    console.log("try again later");
  };


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

      // setTimeout(() => history("/signin"), 4000);
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
                <Link to="/signup">Sign Up</Link>
                <Link to="/forgot-password">Forgot Password</Link>
              </div>


              {/* <OrConatainer>
                <p>OR</p>
              </OrConatainer> */}

              {/* <div id="g_id_onload"
    data-client_id="110878966226-25v19v108muhjcjuf7nt9n2hoh6aluhu.apps.googleusercontent.com"
    data-login_uri="https://localhost:5001/google"
    data-auto_prompt="false">
 </div>
    <div class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
    </div> */}
    
              {/* <GoogleLogin 
                clientId="110878966226-25v19v108muhjcjuf7nt9n2hoh6aluhu.apps.googleusercontent.com"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Continue With Google
                  </GoogleButton>
                )}
                buttonText="Login"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              /> */}
              
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

// const GoogleButton = styled.div`
   
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0.4rem 0;
//   margin: 1rem 0;
//   border-radius: 10rem;
//   font-weight: 500;
//   border: 0.2rem solid #297eff;
//   font-size: 1.6rem;

//   &:hover {
//     cursor: pointer;
//   }
//   @media (max-width: 768px) {
//     font-size: 1.4rem;
//   }
// `;

const SignInSection = styled.div`
  height: calc(100vh - 7.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
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
      margin: 1rem 0;

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

      a {
        &:hover {
          color: var(--bg-light-secondary);
        }
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



const OrConatainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.4rem 0;

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
