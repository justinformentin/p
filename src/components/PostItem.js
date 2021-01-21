import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Information = styled.span`
  font-family: ${(props) => props.theme.fontFamily.heading};
  color: var(--color-grey);
  transition: color ease 0.3s;
  display: flex;
  align-items: center;
`;

const LightLine = styled.span`
  padding: 0 0.5rem;
  color: #999999;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  /* color: var(--color-text); */
  margin-bottom: 0rem;
`;

const SubText = styled.div`
  margin-top: 0.75rem;
  transition: color ease 0.3s;
`;

const StyledLink = styled(Link)`
  h1 {
    // margin: 0 1rem;
  }
  color: var(--color-text);
  transition: color ease 0.3s;
  text-decoration: none;

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

//   {
//   post;
//   timeToRead;
//   excerpt;
//   chunk;
//   path;
// }
export const PostItem = (args) => (
  <>
    {args.timeToRead && (
      <Information>
        {args.post.date}
        <LightLine>|</LightLine>
        {/* {args.timeToRead} Min. */}
        {/* <LightLine>|</LightLine> */}
        <StyledLink to={`/categories/${args.post.category.toLowerCase()}`}>
          #{args.post.category}
        </StyledLink>
      </Information>
    )}
    <PostTitle path={args.path} title={args.post.title} />
    {/* <Information>
      <StyledLink to={`/categories/${args.post.category.toLowerCase()}`}>
        {args.post.category}
      </StyledLink>
    </Information> */}

    {/* {(args.excerpt || args.chunk) && (
      <SubText>{args.excerpt || args.chunk}</SubText>
    )} */}
  </>
);

export default PostItem;
