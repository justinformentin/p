import React from 'react';
import styled from 'styled-components';
// import { Link } from 'gatsby';

const Information = styled.span`
  font-family: ${(props) => props.theme.fontFamily.heading};
  color: var(--color-grey);
  transition: ${(props) => props.theme.trans.color};
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  font-size: 15px;
`;

const LightLine = styled.span`
  padding: 0 0.5rem;
  color: #999999;
`;

// const StyledLink = styled(Link)`
//   color: var(--color-text);
//   transition: ${(props) => props.theme.trans.color};
//   text-decoration: none;
//   &:hover {
//     color: #6f6f6f;
//     transition: ${(props) => props.theme.trans.color};
//   }
// `;

export const PostDetails = ({ date, category, ttr }) => {
  const a = [];
  const d = date.split('-');
  a[0] = d[1];
  a[1] = d[2];
  a[2] = d[0];
  const newDate = new Date(a.join('/'));
  const formattedDate = newDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return(
  <Information>
    {formattedDate}
    {/* <LightLine>-</LightLine> */}
    {/* <StyledLink to={`/categories/${category.toLowerCase()}`}> */}
      {/* {category} */}
    {/* </StyledLink> */}
    <LightLine>-</LightLine>
    {ttr} min
  </Information>
);
  }
