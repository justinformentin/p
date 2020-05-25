import React from "react";
// import PropTypes from "prop-types";
import styled from "react-emotion";
import { Link } from "gatsby";

const Information = styled.div`
  font-family: ${props => props.theme.fontFamily.heading};
  color: #696969;
`;

const LightLine = styled.span`
  padding: 0 0.5rem;
  color: #999999;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  color: #111;
  margin-bottom: 1rem;
`;

const SubText = styled.div`
  margin-top: 0.5rem;
`;

const StyledLink = styled(Link)`
  h1 {
    color: #111;
    transition: color ease 0.3s;
  }
  h1:hover {
    color: #6f6f6f;
    transition: color ease 0.3s;
  }
`;

const PostTitle = ({ path, title }) =>
  path ? (
    <StyledLink to={path}>
      <H1>{title}</H1>
    </StyledLink>
  ) : (
    <H1>{title}</H1>
  );

export const PostItem = ({ post, timeToRead, excerpt, chunk, path }) => (
  <>
    <PostTitle path={path} title={post.title} />
    <Information>
      {post.date}
      <LightLine>|</LightLine>
      {timeToRead} Min.
      <LightLine>|</LightLine>
      <Link to={`/categories/${post.category}`}>{post.category}</Link>
    </Information>
    {(excerpt || chunk) && <SubText>{excerpt || chunk}</SubText>}
  </>
);

export const PostWithExcerpt = ({ excerpt }) => {};

export default PostItem;
