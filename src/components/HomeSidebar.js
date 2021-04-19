import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Github } from '@styled-icons/feather/Github';
import { Twitter } from '@styled-icons/feather/Twitter';
import { Linkedin } from '@styled-icons/feather/Linkedin';
import { Mail } from '@styled-icons/feather/Mail';
import { useTagsQuery } from '../hooks/useTagsQuery';
import kebabCase from 'lodash/kebabCase';
import { Heading } from '../styles/shared';
import { brickBreakerGame } from './BrickBreaker2';
import {useMediaQuery} from '../hooks/useMediaQuery';

const SideBarWrap = styled.div`
  width: 30%;
  max-width: 280px;
  @media (max-width: 750px) {
    width: 100%;
    max-width: 100%;
  }
`;

const IconWrap = styled.div`
  display: flex;
  margin: 0 0 1rem 0;
  justify-content: space-between;
`;

const IconLink = styled.a`
  text-align: center;
  margin-right: 1rem;
  color: var(--color-text);
  &:hover {
    color: var(--color-blue);
    cursor: pointer;
  }
  svg {
    stroke-width: 2px;
    height: 26px;
    width: 26px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TagWrapper = styled(Link)`
  background: #a9ccea;
  color: black;
  border-radius: 5px;
  padding: 6px 8px;
  margin: 0.25rem;
  font-size: 13px;
  flex: 1 0 auto;
  text-align: center;
  transition: background 0.3s ease;
  &:hover {
    background: #7dc3ff;
    cursor: pointer;
  }
`;

const RefBlock = styled.div`
  position: relative;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.playing ? 'grey' : 'transparent')};
`;

const BlockCanvas = styled.canvas`
  position: absolute;
  top: 0;
  display: none;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

const GameButton = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  font-size: 16px;
  color: var(--color-text);
  &:hover {
    cursor: pointer;
    color: var(--color-grey);
  }
  &:active {
    outline: none;
  }
`;

export function HomeSidebar() {
  const refBlock = React.useRef(null);
  const canvasRef = React.useRef(null);
  const tagRef = React.useRef(null);
  const mobile = useMediaQuery('750px');

  const { code, general } = useTagsQuery();
  const allTags = [...code.group, ...general.group];

  const [playing, setPlaying] = React.useState(false);

  function getBrickCoords() {
    // const tagCoords = []
    const tagCont = document.querySelector('#tag-container');
    const parentRect = tagCont.getBoundingClientRect();
    const tags = tagCont.querySelectorAll('a');
    const tagCoords = Array.from(tags).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left,
        y: rect.top - parentRect.top,
        width: el.offsetWidth,
        height: el.offsetHeight,
        text: el.innerText,
        status: 1,
      };
    });
    // console.log('tagCoords', tagCoords)
    return tagCoords;
  }

  function convertToCanvas() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const coords = getBrickCoords();
      canvasRef.current.style.display = 'block';
      setPlaying(true);
      const brickBreaker = brickBreakerGame();
      brickBreaker(canvasRef.current, ctx, coords);
    }
  }

  React.useEffect(() => {
    if (tagRef.current) {
      refBlock.current.refHeight = refBlock.current.offsetHeight + 150 + 'px';
      refBlock.current.refWidth = refBlock.current.offsetWidth + 'px';
      canvasRef.current.height = refBlock.current.offsetHeight + 150;
      canvasRef.current.width = refBlock.current.offsetWidth;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (playing) {
      // console.log('refBlock', refBlock);
      refBlock.current.style.height = refBlock.current.refHeight;
      refBlock.current.style.width = refBlock.current.refWidth;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const gameBtnClick = () => {
    if (!playing) {
      convertToCanvas();
    } else {
      document.dispatchEvent(new Event('canvas:gameCleared'));
      refBlock.current.style.height = 'auto';
      canvasRef.current.style.display = 'none';
      setPlaying(false);
    }
  };

  return (
    <SideBarWrap>
      <Heading>Links</Heading>
      <IconWrap>
        <IconLink href="https://github.com/justinformentin">
          <Github />
        </IconLink>
        <IconLink href="https://twitter.com/whatjustin" rel="me">
          <Twitter />
        </IconLink>
        <IconLink href="https://linkedin.com/in/justinformentin">
          <Linkedin />
        </IconLink>
        <IconLink href="mailto:talktojustintoday@gmail.com">
          <Mail />
        </IconLink>
      </IconWrap>
      <Heading>Tags</Heading>
      <RefBlock ref={refBlock} playing={playing}>
        {!playing && (
          <TagContainer id="tag-container" ref={tagRef}>
            {allTags.map((tag) => (
              <TagWrapper
                key={tag.fieldValue}
                to={`/tags/${kebabCase(tag.fieldValue)}`}
              >
                {tag.fieldValue}
              </TagWrapper>
            ))}
          </TagContainer>
        )}
        <BlockCanvas ref={canvasRef}></BlockCanvas>
      </RefBlock>
      {!mobile && (
        <ButtonWrap>
          <GameButton onClick={gameBtnClick}>
            {playing ? 'Stop Playing' : 'Play BrickBreaker'}
          </GameButton>
        </ButtonWrap>
      )}
    </SideBarWrap>
  );
}
