import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Layout } from '../components';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photoSizes } from '../images/photos';

const AlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
  justify-content: center;
`;

const AlbumItem = styled.div`
  color: white;
  cursor: pointer;
  margin: 0 3rem 1rem 0;
`;
const DefText = styled.div`
  color: var(--theme-text);
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
`;
// const flickrKey = 'faff5a05c8a527a64872b8ad415daf46';
// const flickrSecret = 'ce481e6ab45c99a3';

const baseUrl = (type) =>
  `https://api.flickr.com/services/rest/?method=flickr.${type}&api_key=faff5a05c8a527a64872b8ad415daf46&user_id=10996771@N05&per_page=24&format=json&nojsoncallback=1`;

const getRecent = baseUrl('photos.search') + '&sort=date-posted-desc'

const Photos = () => {
  const [albumError, setAlbumError] = useState(false);
  const [photosError, setPhotosError] = useState(false);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState({});

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const createPhotos = (images) =>
    images.length > 0 &&
    images.map((i: any) => ({
      src: `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}_c.jpg`,
      width: photoSizes[i.id] ? photoSizes[i.id].w : 8,
      height: photoSizes[i.id] ? photoSizes[i.id].h : 5.33,
    }));

  const fetchBase = (url) => fetch(url).then((r) => r.json());

  const RemoveAlbums = [
    'astro',
    'Werk',
    'For the house',
    'Kristina Portraits',
    'Prospect Park',
    '6-1-14',
    'Animals',
    'Portraits',
  ];

  const albumSuccess = (a) => {
    const filteredAlbums = a.photosets.photoset.filter(
      (album) => !RemoveAlbums.some((title) => title === album.title._content)
    );
    const foundPAWS = filteredAlbums.findIndex(
      (aa) => aa.title._content === 'PAWS Cats'
    );
    filteredAlbums[foundPAWS].title._content = 'Cats';
    setAlbums(filteredAlbums);
    setAlbumsLoaded(true);
  };
  const getAlbums = () => {
    setAlbumsLoaded(false);
    fetchBase(baseUrl('photosets.getList'))
      .then(albumSuccess)
      .catch(() => {
        setAlbumsLoaded(true);
        setAlbumError(true);
      });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    Object.keys(photos) &&
      Object.keys(photos).length > 0 &&
      setPhotosLoaded(true);
  }, [photos]);

  const photoSuccess = (p, albumId) => {
    const createdPhotos = createPhotos(p.photoset.photo);
    setPhotos((prevState) => ({
      ...prevState,
      [albumId]: createdPhotos.reverse(),
    }));
    setCurrentAlbum(albumId);
  };

  const getPhotosetPhotos = (albumId) => {
    setPhotosLoaded(false);
    const photoUrl =
      baseUrl('photosets.getPhotos') + `&photoset_id=${albumId}&per_page=20`;
    fetchBase(photoUrl)
      .then((p) => photoSuccess(p, albumId))
      .catch(() => {
        setPhotosLoaded(true);
        setPhotosError(true);
      });
  };

  const selectAlbum = (albumId) =>
    photos[albumId] && photos[albumId].length > 0
      ? setCurrentAlbum(albumId)
      : getPhotosetPhotos(albumId);

  const Loader = () => <DefText>Loading ...</DefText>;

  const Error = ({ message }) => <DefText>{message}</DefText>;

  const AlbumList = () => {
    if (albumError) {
      return <Error message={'Error fetching albums'} />;
    } else if (!albumsLoaded) {
      return <Loader />;
    } else {
      return (
        <AlbumContainer>
          {albums.length > 0 &&
            albums.map((album: any) => {
              return (
                <AlbumItem
                  key={album.title._content}
                  onClick={() =>
                    currentAlbum !== album.id && selectAlbum(album.id)
                  }
                >
                  {album.title._content}
                </AlbumItem>
              );
            })}
        </AlbumContainer>
      );
    }
  };

  const PhotoArea = () => {
    if (photosError) {
      return <Error message={'Error fetching photos'} />;
    } else if (!currentAlbum && !photos[currentAlbum]) {
      return <DefText>Please select Album</DefText>;
    } else if (currentAlbum && !photosLoaded) {
      return <Loader />;
    } else {
      return (
        <Gallery
          photos={photos[currentAlbum]}
          onClick={openLightbox}
          direction={'column'}
        />
      );
    }
  };

  return (
    <Layout>
      <AlbumList />
      <PhotoArea />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos[currentAlbum]}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Layout>
  );
};

export default Photos;
