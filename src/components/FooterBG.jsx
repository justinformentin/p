import React from 'react';
import PropTypes from 'prop-types';
import endPageBackground from 'images/page_background_end.svg';

const FooterBG = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: -2,
      width: '102%',
      height: '180%',
      zIndex: '-1',
      ...style,
    }}
  >
    <img
      style={{
        width: '100%',
        height: '100%',
        objectPosition: 'top',
        objectFit: 'cover',
      }}
      alt="End page background"
      src={endPageBackground}
    />
  </div>
);

export default FooterBG;

FooterBG.propTypes = {
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
};

FooterBG.defaultProps = {
  style: false,
};
