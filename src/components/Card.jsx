import styled from 'react-emotion';
import theme from '../../config/theme';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  color: ${theme.colors.black.base};
  border-radius: ${theme.borderRadius.default};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

export default Card;
