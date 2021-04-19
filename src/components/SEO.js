/* eslint-disable react/require-default-props */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import config from '../../config/website';

const uppercase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const SEO = (props) => {
  // console.log('SEO props', props);

  const { postNode, pageTitle } = props;

  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;
  const blogURL = config.siteUrl + config.pathPrefix;

  const description =
    (!!postNode && postNode.excerpt) || config.siteDescription;
  const image = config.siteUrl + realPrefix + config.siteBanner;
  const postURL = postNode ? config.siteUrl + postNode.fields.slug : null;

  const title = postNode
    ? `${postNode.frontmatter.title} | ${config.siteTitleAlt} – ${uppercase(
        postNode.fields.sourceInstanceName
      )}`
    : pageTitle || config.siteTitle;

  // postNode &&
  // postNode.frontmatter.cover &&
  //   postNode.frontmatter.cover.childImageSharp &&
  //   (image = postNode.frontmatter.cover.childImageSharp.resize.src);

  // image = config.siteUrl + realPrefix + image;

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
  ];
  if (postNode) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      }
    );
  }
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#343849"
      />
      <meta name="apple-mobile-web-app-title" content="Justin Formentin" />
      <meta name="application-name" content="Justin Formentin" />
      <meta name="msapplication-TileColor" content="#3498db" />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:locale" content="en_EN" />
      <meta property="og:site_name" content={config.facebook} />
      <meta property="og:url" content={postURL || blogURL} />
      {!!postNode ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  postNode: PropTypes.object,
  pageTitle: PropTypes.string,
};
