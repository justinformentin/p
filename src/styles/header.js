import styled from 'styled-components';

export const LinkSections = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const NavItemWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  line-height: 1.2;
  font-family: ${(props) => props.theme.fontFamily.heading};
  a {
    text-decoration: none;
    &:hover,
    &:focus,
    &.navlink-active,
    &[aria-current='page'] {
      color: var(--color-link);
    }
  }
`;

export const NameContainer = styled.div`
  text-align: center;
  text-decoration: none;
  margin: auto 0;
  line-height: 1.2;
`;

export const H3 = styled.div`
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text);
  transition: ${(props) => props.theme.trans.color};
  font-family: ${(props) => props.theme.fontFamily.heading};
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const IconWrap = styled.div`
  display: flex;
  margin-top: 0;
  margin-left: 0.75rem;
  justify-content: center;
  flex-direction: column;
`;

export const IconLink = styled.a`
  text-align: center;
  margin-right: 1rem;
  color: var(--color-text);
  &:hover {
    color: var(--color-link);
    cursor: pointer;
  }
  svg {
    stroke-width: 2px;
    height: 22px;
    width: 22px;
  }
`;