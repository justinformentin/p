import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: ${(props) => props.theme.button.primary.background};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.round};
  box-shadow: ${(props) => props.theme.button.primary.boxShadow};
  color: ${(props) => props.theme.colors.white.base};
  cursor: pointer;
  font-family: ${(props) => props.theme.fontFamily.heading};
  display: inline-block;
  font-weight: 700;
  line-height: 1.25;
  font-size: 1rem;
  margin: 0.5rem auto;
  min-width: 4rem;
  padding: 0.75rem 1.5rem;
  text-align: center;
  transition: ${(props) => props.theme.transitions.default.transition};
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 10;
  -webkit-appearance: button;
  &:hover {
    box-shadow: ${(props) => props.theme.button.primary.hover.boxShadow};
    transform: scale(1.04);
  }
`;

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
