import { useState, useEffect } from 'react';

const createReq = (type) => (opts) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let url = 'http://localhost:5000/api/';
  // let url = 'https://justinformentin.com/api/';
  if (opts && opts.path) url += opts.path;

  const request = new Request(url, {
    method: type,
    headers: headers,
  });
  return fetch(request).then((r) => r.json());
};
export const request = {
  get: createReq('GET'),
  put: createReq('PUT'),
  post: createReq('POST'),
  delete: createReq('DELETE'),
};

// const getPath = (slug) => {
//   const pathArr = slug.split('/');
//   return pathArr[pathArr.length - 1];
// };

// export const getPageViews = ({ path, slug }) => {
//   if (!path) path = getPath(slug);
//   return request.get({ path });
// };

export const usePageViews = (slug) => {
  const pathArr = slug.split('/');
  const path = pathArr[pathArr.length - 1];
  const [views, setViews] = useState([]);

  useEffect(() => {
    request
      .get({ path })
      .then((r) =>
        r && r.length > 0
          ? request.put({ path }).then(() => r[0] && setViews(r[0].views))
          : request.post({ path }).then((pr) => pr[0] && setViews(pr[0].views))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return views;
};

// export const getAllViews = () => request.get();
