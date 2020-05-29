import styled from 'react-emotion';

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  padding: ${props => (props.small ? '2rem 5rem' : '2rem 10rem')};
  @media (max-width: 1200px) {
   padding: 2rem 4rem;
  }
  @media (max-width: 600px) {
    padding: 2rem 2rem;
   }
`;

export const InfoText = styled.div`
  text-transform: uppercase;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.colors.black.light};
`;
