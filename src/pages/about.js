import React from 'react';
// import { config, useSpring } from 'react-spring';
import Layout from '../components/Layout';
// import SEO from '../components/SEO';

const About = () => {
    return (
    <Layout>
      {/* <SEO
        title="About | Justin Formentin"
        desc="About"
      /> */}
        <p>
          Early on in my days of learning, I realized that documentation was an
          integral part of any project. I'm also a firm believer that the best
          way to learn anything is to teach it.
        </p>
        <p>
          So I'm putting some of my projects into blog and tutorial format. My
          goal is to both help myself, as well as anyone else out there
          learning, and write articles that are easy to follow and can be
          updated.
        </p>
    </Layout>
  );
};

export default About;
