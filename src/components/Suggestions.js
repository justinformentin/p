import React from 'react';
import styled from 'styled-components';
import { H3, Row, Column } from '../styles/shared';
import { Link } from 'gatsby';

const SuggestionsRow = styled(Row)`
  margin: 1rem 0 5rem 0;
  text-align: center;
  justify-content: space-between;
`;

const SuggestionsColumn = styled(Column)`
  width: ${(props) => (props.both ? '45%' : '100%')};
  &:hover {
    cursor: pointer;
    h3 {
      color: #6f6f6f;
      transition: ${props => props.theme.trans.color};
    }
  }
`;

const Label = styled.div`
  color: var(--color-text);
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 1rem;
`;

const Suggestions = ({ left, right }) => (
  <SuggestionsRow>
    {left && (
      <SuggestionsColumn both={left && right}>
        <Link to={left.fields.slug}>
          <Label>Previous Post</Label>
          <H3>{left.frontmatter.title}</H3>
        </Link>
      </SuggestionsColumn>
    )}
    {right && (
      <SuggestionsColumn both={left && right}>
        <Link to={right.fields.slug}>
          <Label>Next Post</Label>
          <H3>{right.frontmatter.title}</H3>
        </Link>
      </SuggestionsColumn>
    )}
  </SuggestionsRow>
);

export default Suggestions;

// const Suggestions = ({ left, right }) => {
//   return (
//     <SuggestionsRow>
//       {left && (
//         <SuggestionsColumn both={left && right}>
//           <Label>Previous Post</Label>
//           <div>
//             <StyledLink>
//               <TransLink to={left.fields.slug} label={left.frontmatter.title} />
//             </StyledLink>
//           </div>
//         </SuggestionsColumn>
//       )}
//       {right && (
//         <SuggestionsColumn both={left && right}>
//           <Label>Next Post</Label>
//           <div>
//             <StyledLink>
//               <TransLink
//                 to={right.fields.slug}
//                 label={right.frontmatter.title}
//               />
//             </StyledLink>
//           </div>
//         </SuggestionsColumn>
//       )}
//     </SuggestionsRow>
//   );
// };
