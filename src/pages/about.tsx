import React from 'react';
import { config, useSpring } from 'react-spring';
import Layout from '../components/Layout';
import { AnimatedBox } from '../elements';
// import SEO from '../components/SEO';

const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Layout>
      {/* <SEO
        title="About | Jodie"
        desc="Hi. I'm LekoArts! You can visit my website or my other Gatsby projects."
      /> */}
      <AnimatedBox
        style={pageAnimation}
        py={[6, 6, 6, 8]}
        px={[6, 6, 8, 6, 8, 13]}
      >
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
      </AnimatedBox>
    </Layout>
  );
};

export default About;
