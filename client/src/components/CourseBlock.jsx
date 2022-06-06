import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
// import logo from "../assets/logo.svg";
import { useSelector } from "react-redux";
import axios from "axios";

import PopUp from "./PopUp";

const CourseBlock = ({ course, enroll }) => {
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const handlePayment = async (course) => {
    if (!isAuthenticatedUser) {
      setTimeout(() => {
        history("/signin");
      }, 1000);
    }

    var id = course._id;
    try {
      const url = "/api/video/orders";

      const { data } = await axios.post(url, { id });

      dispalyRazorPay(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const dispalyRazorPay = (data) => {
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: course?.title,
      description: `Purchase ${course?.title}`,
      image:
        "https://bucket-for-doubt-test.s3.ap-south-1.amazonaws.com/logo.svg",
      order_id: data.id,

      handler: async (response) => {
        try {
          const verifyUrl = "/api/video/verify-payment";
          const { data } = await axios.post(verifyUrl, response);

          setMessage(data.message);
        } catch (error) {
          setError(error.response.data.message);
        }
      },

      prefill: {
        name: `${user?.name}`,
        email: `${user?.email}`,
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {error && <PopUp content={error} />}
      {message && <PopUp content={message} />}
      <Course>
        <Link to={`/course/${course?._id}`}>
          <img
            src={course?.thumbnail?.imageURL}
            className="course__image"
            alt=""
          />
        </Link>

        <div className="course__details">
          <h3 className="course__title">
            <Link to={`/course/${course?._id}`}>{course?.title}</Link>
          </h3>

          <p className="course__description">{course?.description}</p>
        </div>

        <p className="course__date">
          Created at&nbsp;
          {moment(course?.createdAt).format("MMM Do YYYY")}&nbsp;
          {moment(course?.createdAt).format("h:mm a")}
        </p>

        <p className="course__price">
          Price -{" "}
          <span className="course__price__amount">&#8377; {course?.price}</span>
        </p>

        <div className="course__actions">
          {!enroll && (
            <p
              className="course__enroll"
              value={course}
              onClick={() => handlePayment(course)}
            >
              Enroll
            </p>
          )}

          <Link className="course__preview" to={`/course/${course?._id}`}>
            <p>Preview</p>
          </Link>
        </div>
      </Course>
    </>
  );
};

const Course = styled.div`
  padding: 1rem;
  border-radius: 0.4rem;
  background-color: white;

  .course__image {
    width: 100%;
    height: 16rem;
    border-radius: 0.4rem 0.4rem 0 0;
    object-fit: cover;
  }

  .course__date {
    margin: 0.4rem 0;
    font-size: 1.3rem;
    color: #878787;
  }

  .course__price {
    margin: 0.4rem 0;
    font-size: 1.3rem;
  }

  .course__price__amount {
    font-weight: bold;
  }

  .course__details {
    margin-top: 0.4rem;

    .course__title {
      font-weight: 600;
      font-size: 1.8rem;
    }

    .course__description {
      font-size: 1.4rem;
      line-height: 1.8rem;
      margin-top: 0.6rem;
    }
  }

  .course__actions {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    p {
      padding: 0.4rem 0.8rem;
      font-size: 1.4rem;
      font-weight: 600;
      border-radius: 0.4rem;
      border: 0.2rem solid black;
    }

    .course__enroll {
      margin-right: 1rem;
      background-color: var(--bg-light-secondary);
      color: var(--bg-light-primary);

      &:hover {
        cursor: pointer;
      }
    }

    .course__preview {
      color: var(--bg-light-secondary);
      background-color: var(--bg-light-primary);

      &:hover {
        cursor: pointer;
      }
    }
  }

  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    .course__details {
      .course__title {
        font-size: 1.6rem;
      }

      .course__description {
        font-size: 1.4rem;
      }
    }

    .course__date {
      font-size: 1.2rem;
    }

    .course__actions {
      p {
        font-size: 1.2rem;
      }
    }
  }
`;

export default CourseBlock;
