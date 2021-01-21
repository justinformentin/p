import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel, { Modal, ModalGateway } from 'react-images';
import loading from '../images/transloading.png';

const MasonryContainer = styled.div`
  columns: 3;
  column-gap: 16px;
  @media (max-width: 1200px) {
    columns: 3;
  }
  @media (max-width: 992px) {
    columns: 2;
  }
`;

const MasonryItem = styled.div`
  display: inline-block;
  margin-bottom: 16px;
  position: relative;
  &:before {
    border-radius: 5px;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export function Masonry({ photos }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const openLightbox = React.useCallback((index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageLoaded = (idx) =>
    setImagesLoaded((prevState) => ({
      ...prevState,
      [idx]: true,
    }));

  return (
    <>
      <MasonryContainer id="masonry-container">
        {photos &&
          photos.length > 0 &&
          photos.map((photo, idx) => (
            <MasonryItem
              id="masonry-item"
              key={idx}
              onClick={() => openLightbox(idx)}
            >
              <img
                onLoad={() => imageLoaded(idx)}
                id="masonry-image"
                key={idx}
                src={imagesLoaded[idx] ? photo.src : loading}
                alt="Gallery Item"
              />
            </MasonryItem>
          ))}
      </MasonryContainer>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={photos} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
}
