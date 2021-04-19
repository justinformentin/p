import styled, { css } from 'styled-components';

export const sharedText = css`
  z-index: 10;
  color: var(--color-text);
  margin-top: 0;
  margin-bottom: 0;
  transition: ${(props) => props.theme.trans.color};
`;

export const Spacer = styled.div`
  width: 100%;
  height: 30px;
`;

export const H1 = styled.h1`
  ${sharedText}
  font-size: 2rem;
`;

export const H2 = styled.h2`
  ${sharedText}
  font-size: 1.2rem;
`;

export const H3 = styled.h3`
  ${sharedText}
  font-size: 1.75rem;
  display: inline-block;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Heading = styled(H2)`
  padding-top: 2rem;
  margin-bottom: 1.5rem;
  text-align: ${(props) => props.align || 'center'};
  color: var(--color-bluehead);
`;

export const maxWidthBase = () => css`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 0 2rem;
`;

export const MaxWidth = styled.div`
  ${maxWidthBase}
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: var(--color-grey);
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const InfoText = styled.div`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
`;

export const TagsContainer = styled.div`
  margin: 2rem 0 3rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    background: grey;
    color: #f9f9f9;
    padding: 0.25rem 0.85rem;
    border-radius: 1rem;
    white-space: nowrap;
    margin: 0 1rem 0 0;
    &:hover {
      color: #cacaca;
    }
  }
`;

export const Number = styled.span`
  margin-left: 0.75rem;
  font-size: 0.9rem;
  color: white;
`;
