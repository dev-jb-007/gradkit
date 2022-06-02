import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { CourseBlock } from "../components";
import Logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/actions/courseActions";

const CourseScreen = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <>
      <Course>
        <div className="course__container">
          <div className="course__header">
            <h1 className="course__header__title">Featured Courses</h1>

            <span>by</span>

            <img className="course__header__image" src={Logo} alt="" />
          </div>

          <div className="course__wrapper">
            {courses &&
              courses.map((course) => (
                <CourseBlock course={course} key={course._id} />
              ))}
          </div>
        </div>
      </Course>
    </>
  );
};

const Course = styled.div`
  padding: 0 4rem;
  min-height: calc(100vh - 7.6rem);

  .course__container {
    height: 100%;
    padding: 1rem 0 2rem;

    /* background-color: var(--bg-light-secondary); */
  }

  .course__header {
    font-size: 1.6rem;

    .course__header__title {
      font-size: 2.6rem;
      font-weight: 600;
    }

    .course__header__image {
      width: 10rem;
      margin-left: 0.6rem;
    }
  }

  .course__wrapper {
    margin-top: 3.6rem;
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    grid-gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

export default CourseScreen;
