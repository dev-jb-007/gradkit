import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";

const Footer = () => {
  return (
    <FooterSection>
      <img className="footer__logo" src={logo} alt="" />
      <FooterRow>
        <FooterColumn>
          <h3>Company</h3>

          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </FooterColumn>

        <FooterColumn>
          <h3>Support</h3>

          <li>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/refund-policy">Refund Policy</Link>
          </li>
        </FooterColumn>

        <FooterColumn>
          <h3>Social</h3>

          <li>
            <Link to="/">Linkedin</Link>
          </li>
          <li>
            <Link to="/">Twitter</Link>
          </li>
          <li>
            <Link to="/">Youtube</Link>
          </li>
        </FooterColumn>

        <FooterColumn>
          <h3>Contact</h3>

          <li>
            <a href="mailto:doubt.co923@gmail.com">doubt.co923@gmail.com</a>
          </li>

          <li>
            <a href="tel:+9913356834">+9913356834</a>
          </li>
        </FooterColumn>
      </FooterRow>

      {/* <p className="footer__copyright">
        All rights reserved &copy; {new Date().getFullYear()} Gradkit
      </p> */}
    </FooterSection>
  );
};

const FooterSection = styled.div`
  background-color: black;

  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  .footer__logo {
    margin-bottom: 3.6rem;
    width: 16rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;

    .footer__logo {
      width: 12rem;
    }
  }
`;

const FooterRow = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* display: flex;
  justify-content: space-between;
  flex-wrap: wrap; */
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.6rem;
  }

  li {
    margin-bottom: 0.2rem;
    a {
      font-size: 1.4rem;
      font-weight: 400;
      color: white;

      &:hover {
        color: var(--bg-light-secondary);
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.6rem;
    }

    li {
      a {
        font-size: 1.2rem;
      }
    }
  }
`;

export default Footer;
