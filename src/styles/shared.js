import styled from "react-emotion";

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  padding: ${props => (props.small ? "2rem 5rem" : "2rem 10rem")};
`;
