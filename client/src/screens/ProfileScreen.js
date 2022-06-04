import React from "react";
import styled from "styled-components/macro";
import CourseBlock from "../components/CourseBlock";
import { useSelector } from "react-redux";
import { Loader } from "../components";
// import { loadUser } from "../redux/actions/userActions";

const ProfileScreen = () => {
  const { user, loading } = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //    dispatch(loadUser());
  // }, [dispatch]);

  return (
    <ProfileSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile__header">
            <img
              src="https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="profile"
            />

            <div className="profile__header__info">
              <h1 className="user__name">{user?.name}</h1>
              <p className="user__email">{user?.email}</p>
            </div>
          </div>

          <h3 className="enrolled__course__header">Enrolled Course</h3>
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

  .enrolled__course__header {
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

    img {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin-right: 2rem;
      object-fit: fill;
    }

    .profile__header__info {
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

    @media (max-width: 768px) {
      img {
        width: 6.4rem;
        height: 6.4rem;
      }

      .profile__header__info {
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
