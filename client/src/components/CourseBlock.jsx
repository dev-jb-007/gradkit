import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const CourseBlock = ({ course, enroll }) => {
  return (
    <Course>
      <Link to={`/course/${course?._id}`}>
        <img src={course.thumbnail.imageURL} className="course__image" alt="" />
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
          <Link to="">
            <p className="course__enroll">Enroll</p>
          </Link>
        )}

        <Link className="course__preview" to={`/course/${course?._id}`}>
          <p>Preview</p>
        </Link>
      </div>
    </Course>
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
