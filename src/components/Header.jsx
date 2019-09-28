import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import HeaderBG from './HeaderBG';

const Wrapper = styled.header`
  height: ${props => props.theme.header[props.height]};
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    height: ${props => props.theme.largeheader[props.height]};
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: ${props => props.theme.header[props.height]};
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: ${props => props.theme.header[props.height]};
  }
  position: relative;
`;

const Text = styled.div`
  color: ${props => props.theme.colors.white.base};
  z-index: 1000;
  position: absolute;
  top: ${props => (props.home ? '47%' : '20%')};
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: ${props => props.theme.layout.base};
  padding: 0 2rem;
  margin-bottom: 7rem;
  align-items: center;
`;

const Subtitle = styled.p`
  max-width: 650px;
  color: ${props => props.theme.colors.white.blue};
`;

const ImgContainer = styled(Img)`
  height: 190px;
  width: 190px;
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  padding: 0 3rem;
  transform: translateY(2rem);
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 1rem 2rem 1rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 0 2rem 0;
    }
  }
`;

const Header = ({ children, height, subhead, title, big, img, home, icons, colone, coltwo }) => (
  <Wrapper big={big} height={height}>
    <HeaderBG />
    <Text home={home}>
      <ImgContainer fluid={img || {} || ''} />
      <h3>{subhead}</h3>
      <h1>{title}</h1>
      <h1>{icons}</h1>
      <Columns>
        <Col>{colone}</Col>
        <Col>{coltwo}</Col>
      </Columns>
      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.any,
  subhead: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]).isRequired,
  colone: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  coltwo: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  big: PropTypes.bool,
  height: PropTypes.oneOf(['small', 'medium', 'large', 'extralarge']),
  home: PropTypes.bool,
  img: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  icons: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Header.defaultProps = {
  big: false,
  children: false,
  img: false,
  icons: false,
  home: false,
  height: 'small',
  subhead: false,
  colone: false,
  coltwo: false,
};
