import React from "react";
import styled from "react-emotion";
import PropTypes from "prop-types";
import {PostItem} from 'elements'

const Row = styled.div`
display:flex;
flex-flow:row;
  margin-top: 2rem;
  margin-bottom: 1rem;
  a {
    color: #222;
    text-align: center;
    margin-bottom: 0;
    width:100%;
    color: #222;
    h3 {
      margin-bottom: 0;
    }
    h3:hover {
      color: #
    }
  }
`;

const Suggestions = ({ left, right }) => (
  <Row>
    {left && <PostItem path={left.fields.slug} post={left.frontmatter}/>}
    {right && <PostItem path={right.fields.slug} post={right.frontmatter}/>}
  </Row>
);

export default Suggestions;

Suggestions.propTypes = {
  left: PropTypes.any.isRequired,
  right: PropTypes.any.isRequired
};
