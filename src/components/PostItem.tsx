import React from 'react';
// import PropTypes from "prop-types";
import styled from 'styled-components';
import { Link } from 'gatsby';

const Information = styled.div`
  font-family: ${(props) => props.theme.fontFamily.heading};
  color: var(--theme-grey);
  transition: color ease 0.3s;
`;

const LightLine = styled.span`
  padding: 0 0.5rem;
  color: #999999;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  /* color: var(--theme-text); */
  margin-bottom: 0.75rem;
`;

const SubText = styled.div`
  margin-top: 0.75rem;
  transition: color ease 0.3s;
`;

const StyledLink = styled(Link)`
  /* h1 { */
  color: var(--theme-text);
  transition: color ease 0.3s;
  /* } */
  &:hover {
    color: #6f6f6f;
    transition: color ease 0.3s;
  }
`;

const PostTitle = ({ path, title }) =>
  path ? (
    <StyledLink to={path}>
      <Title>{title}</Title>
    </StyledLink>
  ) : (
    <Title>{title}</Title>
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
        <StyledLink to={`/categories/${args.post.category.toLowerCase()}`}>
          {args.post.category}
        </StyledLink>
      </Information>
    )}
    {(args.excerpt || args.chunk) && (
      <SubText>{args.excerpt || args.chunk}</SubText>
    )}
  </>
);

export default PostItem;
