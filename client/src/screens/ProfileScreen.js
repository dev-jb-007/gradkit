import React from "react";
import styled from "styled-components/macro";
import CourseBlock from "../components/CourseBlock";
import { useSelector } from "react-redux";
import { Loader } from "../components";

const ProfileScreen = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <ProfileSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile__header">
            {/* <img
              src="https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="profile"
            /> */}
            <div className="profile__header-image">
              <i>
                <p className="profile__header-image-letter">
                  {user.name.charAt(0)}
                </p>
              </i>
            </div>

            <div className="profile__header-info">
              <h1 className="user__name">{user?.name}</h1>
              <p className="user__email">{user?.email}</p>
            </div>
          </div>
          {user && user?.courses.length > 0 ? (
            <h3 className="enrolled__course-header">Enrolled Course</h3>
          ) : null}

          <CourseWrapper>
            {user.courses.map((course, index) => (
              <CourseBlock course={course} key={index} enroll={true} />
            ))}
          </CourseWrapper>
        </>
      )}
    </ProfileSection>
  );
};

const ProfileSection = styled.div`
  width: 100%;
  min-height: calc(100vh - 7.6rem);
  padding: 2rem 4rem;

  .enrolled__course-header {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  .profile__header {
    display: flex;
    align-items: center;
    background-color: #171717;
    padding: 2rem;
    border-radius: 0.5rem;
    color: #fff;
    margin-bottom: 2rem;

    .profile__header-image {
      background: rgb(45, 88, 255);
      background: linear-gradient(
        315deg,
        rgba(45, 88, 255, 1) 0%,
        rgba(253, 29, 29, 1) 55%,
        rgba(246, 63, 255, 1) 100%
      );

      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin-right: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .profile__header-image-letter {
        font-size: 4rem;
        font-weight: 600;
      }
    }

    img {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin-right: 2rem;
      object-fit: fill;
    }

    .profile__header-info {
      .user__name {
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .user__email {
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    .profile__header {
      .profile__header-image {
        width: 6.4rem;
        height: 6.4rem;

        .profile__header-image-letter {
          font-size: 2.4rem;
        }
      }

      .profile__header-info {
        .user__name {
          font-size: 1.8rem;
        }

        .user__email {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

const CourseWrapper = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
export default ProfileScreen;
