import { useState, useEffect } from 'react';

const createReq = (type) => (opts) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let url = 'http://localhost:5000/api/';
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

export const usePageViews = (slug) => {
  const pathArr = slug.split('/');
  const path = pathArr[pathArr.length - 1];

  const [views, setViews] = useState([]);

  useEffect(() => {
    request
      .get({ path })
      .then((r) =>
        r && r.length > 0
          ? request.put({ path }).then(() => setViews(r[0].views))
          : request.post({ path }).then((pr) => setViews(pr[0].views))
      );
  }, []);

  return views;
};
