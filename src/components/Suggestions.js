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
      transition: ${(props) => props.theme.trans.color};
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

const SuggestionsColumnWrap = ({ main, ter, kind }) => {
  const hasMain = main && main.frontmatter && main.frontmatter.title;
  const hasSecondary = ter && ter.frontmatter && ter.frontmatter.title;
  return (
    hasMain && (
      <SuggestionsColumn both={hasMain && hasSecondary}>
        <Link to={main.fields.slug}>
          <Label>{kind} Post</Label>
          <H3>{main.frontmatter.title}</H3>
        </Link>
      </SuggestionsColumn>
    )
  );
};

const Suggestions = ({ left, right }) => (
  <SuggestionsRow>
    <SuggestionsColumnWrap main={left} ter={right} kind="Previous" />
    <SuggestionsColumnWrap main={right} ter={left} kind="Next" />
  </SuggestionsRow>
);

export default Suggestions;
