import React from 'react';
// import PropTypes from "prop-types";
import styled from 'styled-components';
import { Link } from 'gatsby';

const Information = styled.div`
  font-family: ${(props) => props.theme.fontFamily.heading};
  color: #696969;
`;

const LightLine = styled.span`
  padding: 0 0.5rem;
  color: #999999;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  color: #111;
  margin-bottom: 0.75rem;
`;

const SubText = styled.div`
  margin-top: 0.75rem;
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

export const PostItem = (args: {
  post;
  timeToRead?: string;
  excerpt?: string;
  chunk?: string;
  path?: string;
}) => (
  <>
    <PostTitle path={args.path} title={args.post.title} />
    {args.timeToRead && (
      <Information>
        {args.post.date}
        <LightLine>|</LightLine>
        {args.timeToRead} Min.
        <LightLine>|</LightLine>
        <Link to={`/categories/${args.post.category}`}>
          {args.post.category}
        </Link>
      </Information>
    )}
    {(args.excerpt || args.chunk) && (
      <SubText>{args.excerpt || args.chunk}</SubText>
    )}
  </>
);

export default PostItem;
