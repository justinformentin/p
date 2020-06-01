import styled from 'styled-components';
import { darken } from 'polished';
import theme from '../../config/theme';

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
  background: ${props => darken(0.25, props.theme.tint.black)};
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
  padding: ${props => (props.small ? '2rem 5rem' : '2rem 8rem')};
  @media (max-width: 1200px) {
   padding: 2rem 3rem;
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
