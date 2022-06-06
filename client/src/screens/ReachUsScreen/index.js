import React from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import { Loader } from "../../components";
import { useSelector } from "react-redux";

const ReachUsScreen = () => {
  const { loading } = useSelector((state) => state.message);

  return (
    <>
      {loading && <Loader />}
      <AboutSection id="#about" />
      <ContactSection id="#contact" />
    </>
  );
};

export default ReachUsScreen;
