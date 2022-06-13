import "./App.css";
import { Footer, Header } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  ForgotPasswordScreen,
  ResetPasswordScreen,
  SigninScreen,
  SignupScreen,
} from "./screens/Authentication";

import CourseScreen from "./screens/CourseScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import CourseViewScreen from "./screens/CourseViewScreen";
import VideoPlayerScreen from "./screens/VideoPlayerScreen";
import VerifyEmailScreen from "./screens/Authentication/VerifyEmailScreen";

import ReachUsScreen from "./screens/ReachUsScreen";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import { Fragment, useEffect } from "react";
import {
  PrivacyPolicyScreen,
  RefundPolicyScreen,
  TermsScreen,
} from "./screens/Support";
import UploadScreen from "./screens/UploadScreen";
import Error404Screen from "./screens/Error404Screen";
import ScrollToTop from "./utils/ScrollToTop";
import MaintainanceScreen from "./screens/MaintainanceScreen";

function App() {
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Fragment>
          <ScrollToTop />
          <Header />
          <Routes>
            {process.env.REACT_APP_MODE === "development" ? (
              <Route path="*" element={<MaintainanceScreen />} />
            ) : (
              <>
                {isAuthenticatedUser ? (
                  <Route exact path="/" element={<ProfileScreen />} />
                ) : (
                  <Route exact path="/" element={<HomeScreen />} />
                )}

                <Route path="/reach-us" element={<ReachUsScreen />} />

                <Route path="/signin" element={<SigninScreen />} />

                <Route path="/signup" element={<SignupScreen />} />

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordScreen />}
                />

                <Route
                  path="/reset-password/:token"
                  element={<ResetPasswordScreen />}
                />

                <Route
                  path="/verify-email/:id"
                  element={<VerifyEmailScreen />}
                />

                <Route path="/course" element={<CourseScreen />} />

                <Route path="/course/:id" element={<CourseViewScreen />} />

                <Route
                  path="/video/:vid/:cid"
                  element={<VideoPlayerScreen />}
                />

                <Route path="/terms-conditions" element={<TermsScreen />} />

                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicyScreen />}
                />

                <Route path="/refund-policy" element={<RefundPolicyScreen />} />

                {isAuthenticatedUser && user && user.role >= 1 && (
                  <Route path="/admin" element={<UploadScreen />} />
                )}

                <Route path="*" element={<Error404Screen />} />
              </>
            )}
          </Routes>

          {/* Footer */}

          <Footer />
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
