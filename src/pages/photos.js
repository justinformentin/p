import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from '../components';
import { photoSizes } from '../images/photos';
import { Masonry } from '../components/Masonry';

const DefText = styled.div`
  color: var(--color-text);
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const PageButton = styled.div`
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  margin: 1rem;
  box-shadow: 2px 2px 7px 1px rgb(0 0 0 / 30%);
  color: var(--color-background);
  background: var(--color-bluehead);
  &:hover {
    cursor: pointer;
  }
`;
// const flickrKey = 'faff5a05c8a527a64872b8ad415daf46';
// const flickrSecret = 'ce481e6ab45c99a3';

const baseUrl = (type) =>
  `https://api.flickr.com/services/rest/?method=flickr.${type}&api_key=faff5a05c8a527a64872b8ad415daf46&user_id=10996771@N05&per_page=24&format=json&nojsoncallback=1`;

const Photos = () => {
  const [photosError, setPhotosError] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [photos, setPhotos] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const recentPhotosUrl = baseUrl('photos.search') + '&sort=date-posted-desc';

  const createPhotos = (images) =>
    images.length > 0 &&
    images.map((i) => ({
      src: `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}_c.jpg`,
      width: photoSizes[i.id] ? photoSizes[i.id].w : 8,
      height: photoSizes[i.id] ? photoSizes[i.id].h : 5.33,
    }));

  const fetchBase = (url) => fetch(url).then((r) => r.json());

  const loadPrevPage = () => {
    setCurrentPage((c) => c - 1);
  };

  const loadNextPage = () => {
    if (!fetching) {
      setFetching(true);
      console.log('photos[currentPage + 1]', photos[currentPage + 1]);
      if (photos[currentPage + 1] && photos[currentPage + 1].length > 0) {
        setCurrentPage((c) => c + 1);
        setFetching(false);
      } else {
        const nextPhotoPageUrl =
          recentPhotosUrl + '&page=' + String(currentPage + 1);
        setCurrentPage((c) => c + 1);
        fetchPhotos(nextPhotoPageUrl, currentPage + 1);
      }
    }
  };

  const fetchPhotos = (url, pageNum) =>
    fetchBase(url)
      .then((p) => {
        const createdPhotos = createPhotos(p.photos.photo);
        console.log('createdPhotos', createdPhotos);
        setPhotos((prevState) => ({
          ...prevState,
          [pageNum]: createdPhotos,
        }));
        setFetching(false);
      })
      .catch(() => {
        setPhotosLoaded(true);
        setPhotosError(true);
      });

  const getPhotosetPhotos = () => {
    setPhotosLoaded(false);
    fetchPhotos(recentPhotosUrl, 1);
  };

  useEffect(() => {
    getPhotosetPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.keys(photos) &&
      Object.keys(photos).length > 0 &&
      setPhotosLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  const Loader = () => <DefText>Loading ...</DefText>;

  const Error = ({ message }) => <DefText>{message}</DefText>;

  const PhotoArea = () => {
    if (photosError) {
      return <Error message={'Error fetching photos'} />;
    } else if (!photosLoaded) {
      return <Loader />;
    } else {
      return <Masonry photos={photos[currentPage]} />;
    }
  };

  return (
    <Layout>
      <ButtonWrap>
        {currentPage > 1 && (
          <PageButton onClick={loadPrevPage}>Previous Page</PageButton>
        )}
        <PageButton onClick={loadNextPage}>Next Page</PageButton>
      </ButtonWrap>
      <PhotoArea />
    </Layout>
  );
};

export default Photos;
