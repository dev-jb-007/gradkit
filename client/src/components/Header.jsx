import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { logout } from "../redux/actions/userActions";

const Header = () => {
  const { isAuthenticatedUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar>
      <Link to="/">
        <img
          className="nav__logo"
          src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/logo.svg"
          alt="gradkit-logo"
        />
      </Link>
      <div className="nav__links">
        <Link to="/course" className="nav__link">
          Courses
        </Link>
        <Link to="/reach-us" className="nav__link">
          Reach Us
        </Link>

        {isAuthenticatedUser ? (
          <span onClick={signOut} className="nav__link">
            Sign Out
          </span>
        ) : (
          <Link to="/signin" className="nav__link">
            Sign In
          </Link>
        )}
      </div>
    </Navbar>
  );
};

const Navbar = styled.div`
  height: 7.6rem;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  font-size: 1.4rem;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  .nav__logo {
    width: 12rem;
  }

  .nav__link {
    font-size: 1.4rem;
    font-weight: 600;
    margin-left: 0.8rem;
    color: black;
    padding: 0.6rem 1rem;
    border-radius: 0.4rem;

    &:nth-child(2n-1) {
      background-color: var(--bg-light-secondary);
      border: 0.1rem solid black;
      color: white;
    }
    &:nth-child(2n) {
      border: 0.1rem solid black;
    }

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;

    .nav__logo {
      width: 7rem;
    }

    .nav__link {
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
    }
  }
`;

export default Header;
