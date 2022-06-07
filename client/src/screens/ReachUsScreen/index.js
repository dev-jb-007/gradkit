import React from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import { Loader } from "../../components";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const ReachUsScreen = () => {
  const { loading } = useSelector((state) => state.message);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reach Us</title>
        <meta
          name="description"
          content="Gradkit's About and Contact page. Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology semester 4 courses"
        />
      </Helmet>
      {loading && <Loader />}
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default ReachUsScreen;
