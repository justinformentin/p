import React from 'react';
import PropTypes from 'prop-types';
import startPageBackground from 'images/page_background_start.svg';

const HeaderBG = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      top: -1,
      left: -2,
      width: '102%',
      height: '150%',
      zIndex: '-1',
      ...style,
    }}
  >
    <img
      style={{
        width: '100%',
        height: '100%',
        objectPosition: 'bottom',
        objectFit: 'cover',
      }}
      alt="Start page background"
      src={startPageBackground}
    />
  </div>
);

export default HeaderBG;

HeaderBG.propTypes = {
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
};

HeaderBG.defaultProps = {
  style: false,
};
