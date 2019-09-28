import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: ${props => props.theme.button[props.type].background};
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  box-shadow: ${props => props.theme.button[props.type].boxShadow};
  color: ${props => props.theme.colors.white.base};
  cursor: pointer;
  font-family: ${props => props.theme.fontFamily.heading};
  display: inline-block;
  font-weight: 700;
  line-height: 1.25;
  font-size: ${props => (props.large ? '1.25rem' : '1rem')};
  margin: ${props => (props.large ? '2rem auto' : '0.5rem auto')};
  min-width: ${props => (props.large ? '10rem' : '4rem')};
  padding: ${props => (props.large ? '0.75rem 1.25rem' : '0.75rem 1.5rem')};
  text-align: center;
  transition: ${props => props.theme.transitions.default.transition};
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 10;
  -webkit-appearance: button;
  &:hover {
    box-shadow: ${props => props.theme.button[props.type].hover.boxShadow};
    transform: scale(1.04);
  }
`;

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  type: 'default',
};
