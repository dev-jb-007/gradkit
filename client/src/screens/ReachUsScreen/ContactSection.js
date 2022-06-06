import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
// import { Message } from "../../components";
import { sendMessage } from "../../redux/actions/messageActions";

const ContactSection = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  // const { message } = useSelector((state) => state.message);

  const submitMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessage(name, email, feedback));
  };

  // useEffect(() => {
  //   if (message) {
  //     setName("");
  //     setEmail("");
  //     setFeedback("");

  //     dispatch(clearMessages());
  //   }
  // }, [message, dispatch]);

  return (
    <Contact>
      <ContactContainer>
        <div className="form__container">
          <form onSubmit={submitMessage}>
            <h1>Contact Us</h1>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="message">Message</label>
            <input
              type="message"
              id="message"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button type="submit" className="form__button">
              Send
            </button>

            {/* {message && <Message status="success">{message}</Message>} */}

            <div className="address__conrainer">
              <img
                src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/location-icon.svg"
                className="location__icon"
                alt=""
              />
              <a
                href="https://goo.gl/maps/4uKhpdh1UbvUaPSL7"
                target="_blank"
                rel="noopener noreferrer"
              >
                35,36, Sai Ashish society, Tadwadi, Rander road, Surat - 395009
              </a>
            </div>

            <div className="contact__container">
              <img
                src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/phone.svg"
                className="phone__icon"
                alt=""
              />
              <a href="tel:+919913356834">+91-9913356834</a>
            </div>
          </form>
        </div>

        <div className="image__container">
          <img
            src="https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/contact.svg"
            alt=""
          />
        </div>
      </ContactContainer>
    </Contact>
  );
};

const Contact = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ContactContainer = styled.div`
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
    }

    .address__conrainer {
      display: flex;
      align-items: center;
      margin-top: 1rem;

      .location__icon {
        margin-right: 0.8rem;
        width: 5rem;
        height: 5rem;
      }

      a {
        font-size: 1.4rem;
        font-weight: 400;
      }
    }

    .contact__container {
      display: flex;
      align-items: center;
      margin-top: 1rem;

      .phone__icon {
        margin-right: 0.8rem;
        width: 4.8rem;
        height: 4.8rem;
      }

      a {
        font-size: 1.4rem;
        font-weight: 400;
      }
    }

    @media (max-width: 768px) {
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
    padding: 2rem;

    img {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    box-shadow: none;
  }
`;

export default ContactSection;
