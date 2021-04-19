import styled from 'styled-components';
import { MaxWidth } from './shared';

export const PostHeadingWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

export const PostContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 2rem;
`;

export const PostWrap = styled.div`
  max-width: ${(props) => (props.article && !props.medium ? '800px' : '100%')};
  width: ${(props) => (props.article && !props.medium ? '70%' : '100%')};
`;

export const PostMaxWidth = styled(MaxWidth)`
  max-width: 45rem;
`;
