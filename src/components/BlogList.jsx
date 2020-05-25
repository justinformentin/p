import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
import { CSSTransition } from 'react-transition-group';
import theme from '../../config/theme';

const Animation = css`
  .message-enter {
    opacity: 0.01;
    transform: scale(1) translateY(40%);
  }
  .message-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0%);
    transition: all 300ms ease-out;
  }
  .message-exit {
    opacity: 1;
    transform: scale(1) translateY(0%);
  }
  .message-exit-active {
    opacity: 0.01;
    transform: scale(0.9) translateY(50%);
    transition: all 300ms ease-out;
  }
`;

const Wrapper = styled.article`
  ${Animation};
  margin-bottom: 4rem;
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.big.default};
  transition: ${props => props.theme.transitions.boom.transition};
  height: 17rem;
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.big.hover};
    transform: scale(1.04);
    }
  }
  flex-basis: calc(99.9% * 1 / 3 - 2.5rem);
  max-width: calc(99.9% * 1 / 3 - 2.5rem);
  width: calc(99.9% * 1 / 3 - 2.5rem);
  @media (max-width: 1340px) {
    height: 17rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    &:nth-child(n) {
      flex-basis: calc(99.9% * 1 / 2 - 1rem);
      max-width: calc(99.9% * 1 / 2 - 1rem);
      width: calc(99.9% * 1 / 2 - 1rem);
      height: 17rem;
    }
  }
  @media (max-width: 1080px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 800px) {
    &:nth-child(n) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
      margin: 0 4rem 2rem 4rem;
      height: 15rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    &:nth-child(n) {
      height: 15rem;
      margin: 0 2rem 2rem 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    &:nth-child(n) {
      height: 15rem;
      margin: 0 0 2rem 0;
    }
  }
`;

const StyledLink = styled(Link)`
  text-shadow: ${theme.shadow.text.small};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  z-index: 3;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 49, 102, 0.35);
    z-index: -10;
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Date = styled.div`
  color: ${props => props.theme.colors.white.light};
  padding-bottom: 0.25rem;
`;

const Excerpt = styled.div`
  color: ${props => props.theme.colors.white.light};
  padding: 0;
`;

const TextBox = styled.div`
  color: ${props => props.theme.colors.white.light};
  margin: 0;
  padding: 0;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white.light};
  text-align: left;
  margin-bottom: 0;
`;

const Block = styled.div`
  display: inline-block;
  transition: all 0.6s cubic-bezier(0.27, 0.06, 0.21, 0.98);
  &:hover {
    opacity: 1;
    }
  }
`;

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState() {
    return {
      isHovering: !this.state.isHovering,
    };
  }
  render() {
    const { cover, path, date, title, chunk } = this.props;
    return (
      <Wrapper onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
        <Image>
          <Img fluid={cover} />
        </Image>
        <StyledLink to={path}>
          <div>
            <Information>
              <Date>{date}</Date>
              <Title>{title}</Title>
            </Information>
          </div>
          <TextBox>
            <CSSTransition in={this.state.isHovering} timeout={0} classNames="message" unmountOnExit>
              <Block>
                <Excerpt>{chunk}</Excerpt>
              </Block>
            </CSSTransition>
          </TextBox>
        </StyledLink>
      </Wrapper>
    );
  }
}

export default BlogList;

BlogList.propTypes = {
  cover: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chunk: PropTypes.string.isRequired,
};
