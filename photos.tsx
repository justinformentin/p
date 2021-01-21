// import { fake } from 'cypress/types/sinon';
import React, { useState, useEffect, useCallback } from 'react';
// import Img from 'gatsby-image';
// import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Button, Header, Layout, PostItem } from '../components';
// import { Container } from '../styles/shared';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photoSizes } from '../images/photos';
const PhotoContainer = styled.div``;
const AlbumItem = styled.div`
  color: white;
  cursor: pointer;
`;
const DefText = styled.div`
  color: var(--theme-text-color);
`;
// const flickrKey = 'faff5a05c8a527a64872b8ad415daf46';
// const flickrSecret = 'ce481e6ab45c99a3';

const baseUrl = (type) =>
  `https://api.flickr.com/services/rest/?method=flickr.${type}&api_key=faff5a05c8a527a64872b8ad415daf46&user_id=10996771@N05&per_page=24&format=json&nojsoncallback=1`;

const Photos = () => {
  const [albumError, setAlbumError] = useState(false);
  const [photosError, setPhotosError] = useState(false);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState({});
  console.log('currentAlbum', currentAlbum);
  console.log('photos', photos);
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

  const getImageSizes = (createdPhotos) => {
    const promiseArr = [];
    createdPhotos.forEach((photo: { id: string; src: string }) => {
      const url = baseUrl('photos.getSizes') + '&photo_id=' + photo.id;
      const imageSizeFetch = fetch(url)
        .then((r) => r.json())
        .then((r) => ({ id: photo.id, ...r.sizes.size[8] }));
      // .then((r) => {
      //   console.log('sizes', r);
      // });
      promiseArr.push(imageSizeFetch);
    });
    return Promise.all(promiseArr);
  };

  const createPhotos = (images) => {
    return (
      images.length > 0 &&
      images.map((image: any) => {
        console.log('image', image);
        // return getImageSize(image.id).then((photoSize) => {
        //   console.log('photoSize', photoSize);
        //   const width = photoSize.sizes.size[8].width / 100;
        //   const height = photoSize.sizes.size[8].height / 100;
        const { farm, server, id, secret, title } = image;

        let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_c.jpg`;
        console.log('URL', url)
        // return <img src={url} key={id} alt={title} />;
        // console.log('width', width);
        // console.log('height', height);
        console.log('FOUND PHOTO SIZE: ', id, photoSizes[id])
        const imgWidth = photoSizes[id] ? photoSizes[id].w : 8;
        // const imgHeight = photoSizes[id] ? photoSizes[id].h : 5.33;
        return {
          id,
          src: url,
          // width: imgWidth,
          // height: imgHeight,
          // width: width.toFixed(),
          // height: height.toFixed(),
          //  width: 8, height: 5
        };
        // });
      })
    );
  };
  // 49439006538
  // const createPhotos = (images) =>
  //   images.length > 0 ? (
  //     images.map((image: any) => {
  //       console.log('image', image);
  //       return getImageSize(image.id).then((photoSize) => {
  //         console.log('photoSize', photoSize);
  //         const width = photoSize.sizes.size[8].width / 100;
  //         const height = photoSize.sizes.size[8].height / 100;
  //         const { farm, server, id, secret, title } = image;
  //         let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_c.jpg`;
  //         // return <img src={url} key={id} alt={title} />;
  //         console.log('width', width)
  //         console.log('height', height)
  //         return {
  //           src: url,
  //           width: width.toFixed(),
  //           height: height.toFixed(),
  //           //  width: 8, height: 5
  //         };
  //       });
  //     })
  //   ) : (
  //     <div>No images</div>
  //   );

  const fetchBase = (url) => fetch(url).then((r) => r.json());

  const getAlbums = () => {
    setAlbumsLoaded(false);
    fetchBase(baseUrl('photosets.getList'))
      .then((a) => {
        setAlbums(a.photosets.photoset);
        setAlbumsLoaded(true);
      })
      .catch(() => {
        setAlbumsLoaded(true);
        setAlbumError(true);
      });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const getPhotosetPhotos = (albumId) => {
    setPhotosLoaded(false);
    fetchBase(
      baseUrl('photosets.getPhotos') + `&photoset_id=${albumId}&per_page=100`
    )
      .then((p) => {
        const createdPhotos = createPhotos(p.photoset.photo);
        console.log('createdPhotos', createdPhotos)
        getImageSizes(createdPhotos).then((photoSize) => {
          console.log('photoSize', photoSize)
          // const photoArr = photoSize.map((p: any) => ({
          //   id: p.id,
          //   src: p.source,
          //   width: Number((p.width / 100)),
          //   height: Number((p.height / 100)),
          // })

          // );
          const photoArr2 = photoSize.map((p: any) => ({
            id: p.id,
            w: Number((p.width / 100)),
            h: Number((p.height / 100)),
          }))

          // const src = photoSize.sizes.size[8].source;
          // const width = photoSize.sizes.size[8].width;
          // const height = photoSize.sizes.size[8].height;

          // setPhotos((prevState) => ({
          //   ...prevState,
          //   [albumId]: photoArr.reverse(),
          // }));
        const filtered = photoArr2.filter((p: any) => !(p.w === 8 && p.h === 5.33));
        console.log('photoArr', filtered);

        });


        console.log('photos', photos);
        setPhotos((prevState) => ({
          ...prevState,
          [albumId]: createdPhotos.reverse(),
        }));

        setCurrentAlbum(albumId);
        setPhotosLoaded(true);
      })
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
        <div>
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
        </div>
      );
    }
  };

  console.log('photos', photos);
  const PhotoArea = () => {
    if (photosError) {
      return <Error message={'Error fetching photos'} />;
    } else if (!currentAlbum && !photos[currentAlbum]) {
      return <DefText>Please select Album</DefText>;
    } else if (currentAlbum && !photosLoaded) {
      return <Loader />;
    } else {
      // return <PhotoContainer>{photos[currentAlbum]}</PhotoContainer>;
      return photos &&
        photos[currentAlbum] &&
        photos[currentAlbum].length > 0 ? (
        <Gallery
          photos={photos[currentAlbum]}
          onClick={openLightbox}
          direction={'column'}
        />
      ) : null;
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
              views={photos[currentAlbum].map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Layout>
  );
};

export default Photos;
