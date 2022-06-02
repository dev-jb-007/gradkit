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

import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import { useEffect } from "react";
import {
  PrivacyPolicyScreen,
  RefundPolicyScreen,
  TermsScreen,
} from "./screens/Support";
import UploadScreen from "./screens/UploadScreen";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {/* Header */}

        <Header />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />

          <Route path="/reach-us" element={<ReachUsScreen />} />

          {/* Authentication */}

          <Route path="/signin" element={<SigninScreen />} />

          <Route path="/signup" element={<SignupScreen />} />

          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

          <Route
            path="/reset-password/:token"
            element={<ResetPasswordScreen />}
          />

          <Route path="/verify-email/:id" element={<VerifyEmailScreen />} />

          <Route path="/profile" element={<ProfileScreen />} />

          {/* Courses */}

          <Route path="/course" element={<CourseScreen />} />

          <Route path="/course/:id" element={<CourseViewScreen />} />

          <Route path="/video/:id" element={<VideoPlayerScreen />} />

          {/*  */}

          <Route path="/terms-conditions" element={<TermsScreen />} />

          <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />

          <Route path="/refund-policy" element={<RefundPolicyScreen />} />

          <Route path="/admin" element={<UploadScreen />} />
        </Routes>

        {/* Footer */}

        <Footer />
      </Router>
    </div>
  );
}

export default App;
