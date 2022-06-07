import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

const PrivacyPolicyScreen = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Gradkit's Privacy Policy, Gradkit is a platform for Gujarat Technical University Computer Science and Information Technology Semester 4 courses"
        />
      </Helmet>
      <PrivacyPolicyContainer>
        <h1>Privacy Policy for DoubtCo</h1>
        <br />
        <p>
          At GradKit, accessible from https://gradkit.vercel.app/, one of our
          main priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by GradKit and how we use it.
        </p>
        <br />
        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>
        <br />
        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in GradKit. This policy is not applicable to any
          information collected offline or via channels other than this website.
          Our Privacy Policy was created with the help of the{" "}
          <a href="https://www.termsfeed.com/privacy-policy-generator/">
            Free Privacy Policy Generator
          </a>
          .
        </p>
        <br />
        <h2>Consent</h2>
        <br />
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
        <br />
        <h2>Information we collect</h2>
        <br />
        <p>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>
        <br />
        <p>
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <br />
        <p>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>
        <br />
        <h2>How we use your information</h2>
        <br />
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>
        <br />
        <h2>Log Files</h2>
        <br />
        <p>
          GradKit follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
        </p>
        <br />
        <h2>Cookies and Web Beacons</h2>
        <br />
        <p>
          Like any other website, GradKit uses 'cookies'. These cookies are used
          to store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page
          content based on visitors' browser type and/or other information.
        </p>
        <br />
        <p>
          For more general information on cookies, please read
          <a href="https://www.termsfeed.com/blog/sample-cookies-policy-template/#What_Are_Cookies">
            the Cookies article on TermsFeed website
          </a>
          .
        </p>
        <br />
        <h2>Advertising Partners Privacy Policies</h2>
        <br />
        <p>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of GradKit.
        </p>
        <br />
        <p>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on GradKit, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>
        <br />
        <p>
          Note that GradKit has no access to or control over these cookies that
          are used by third-party advertisers.
        </p>
        <br />
        <h2>Third Party Privacy Policies</h2>
        <br />
        <p>
          GradKit's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>
        <br />
        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </p>
        <br />
        <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <br />
        <p>
          Under the CCPA, among other rights, California consumers have the
          right to:
        </p>
        <br />
        <p>
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
        </p>
        <br />
        <p>
          Request that a business delete any personal data about the consumer
          that a business has collected.
        </p>
        <br />
        <p>
          Request that a business that sells a consumer's personal data, not
          sell the consumer's personal data.
        </p>
        <br />
        <p>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </p>
        <br />
        <h2>GDPR Data Protection Rights</h2>
        <br />
        <p>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </p>
        <br />
        <p>
          The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
        </p>
        <br />
        <p>
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
        </p>
        <br />
        <p>
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </p>
        <br />
        <p>
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.
        </p>
        <br />
        <p>
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        </p>
        <br />
        <p>
          The right to data portability – You have the right to request that we
          transfer the data that we have collected to another organization, or
          directly to you, under certain conditions.
        </p>
        <br />
        <p>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </p>
        <br />
        <h2>Children's Information</h2>
        <br />
        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>
        <br />
        <p>
          GradKit does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>
      </PrivacyPolicyContainer>
    </>
  );
};

const PrivacyPolicyContainer = styled.div`
  min-height: calc(100vh - 7.6rem);
  padding: 2rem 4rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  ul {
    margin-left: 2.4rem;
  }

  li {
    font-size: 1.4rem;
    list-style: circle;
  }

  p {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    li,
    p {
      font-size: 1.125rem;
    }
  }
`;

export default PrivacyPolicyScreen;
