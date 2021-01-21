import styled from 'styled-components';
import theme from '../../config/theme';

export const MaxWidth = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 0 2rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  color: ${theme.colors.black.base};
  border-radius: ${theme.borderRadius.default};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: var(--color-text);
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  // color: var(--theme-text);
  // padding: 2rem;
  // margin: 0 auto;
  // width: 60%;
  // @media (max-width: 1600px) {
  //   width: 75%;
  // }
  // @media (max-width: 1200px) {
  //   width: 80%;
  // }
  // @media (max-width: 600px) {
  //   width: 100%;
  // }
`;

export const InfoText = styled.div`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
`;

export const TagsContainer = styled.div`
  margin: 2rem 0 1rem 0;
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
    margin: 0 1rem 1rem 0;
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

export const Base = styled.div`
  display: flex;
  flex-direction: column;
`;
// display: flex;
// flex-flow: row wrap;
// justify-content: space-between;
// margin: 0 auto;
// &::after {
//   content: '';
//   flex: 0 0 32%;
// }
// @media (max-width: 800px) {
//   flex-direction: column;
// }
// `;

export const PostWrapper = styled.div`
  height: 100%;
  margin-bottom: 2rem;
  flex-direction: column;
  display: flex;
  // max-width: 30rem;
`;

//   // flex-basis: calc(99.9% * 1 / 3 - 2.5rem);
//   // max-width: calc(99.9% * 1 / 3 - 2.5rem);
//   // width: calc(99.9% * 1 / 3 - 2.5rem);
//   // @media (max-width: 1340px) {
//   //   height: 17rem;
//   // }
//   // @media (max-width: 1200px) {
//     // &:nth-child(n) {
//     //   flex-basis: calc(99.9% * 1 / 2 - 1rem);
//     //   max-width: calc(99.9% * 1 / 2 - 1rem);
//     //   width: calc(99.9% * 1 / 2 - 1rem);
//     //   height: 15rem;
//     // }
//   // }
//   // @media (max-width: 1080px) {
//   //   margin-bottom: 2rem;
//   // }
//   @media (max-width: 800px) {
//     flex-direction: column;
//     // &:nth-child(n) {
//     //   flex-basis: 100%;
//     //   max-width: 100%;
//     //   width: 100%;
//     // }
//   }
// `;
