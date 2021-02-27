import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Line, H1 } from '../styles/shared';
import {
  PostHeadingWrapper,
  PostContainer,
  PostWrap,
  PostMaxWidth,
} from '../styles/sharedPost';
import {
  Tags,
  Suggestions,
  // SEO,
  PostDetails,
  Content,
  Layout,
} from '../components';
import { usePageViews } from '../hooks/usePageViews';

const TocWrap = styled.div`
  position: sticky;
  top: 3rem;
  transition: ${(props) => props.theme.trans.all};
`;

const TocItem = styled.div`
  padding-left: ${({ level, highest }) =>
    level === highest
      ? '0'
      : level === 3
      ? '1rem'
      : level === 4
      ? '2rem'
      : '0'};
`;
const TocLink = styled.a`
  color: var(--color-text);
  font-size: 15px;
  text-decoration: none;
`;
const TocHeader = styled.div`
  font-size: 16px;
  color: var(--color-text);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// const HighlightH1 = styled(H1)`
//   // background-image: linear-gradient(0deg, var(--color-title-bg) 50%, transparent 60%);
//   position: relative;
//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background-image: linear-gradient(0deg, #d2ecff 50%, transparent 60%);
//     transition: opacity ease 0.3s;
//     opacity: var(--ho-light);
//     z-index: -1;
//   }
//   &:after {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background-image: linear-gradient(0deg, #2b4964 50%, transparent 60%);
//     transition: opacity ease 0.3s;
//     opacity: var(--ho-dark);
//     z-index: -1;
//   }
// `;

export default ({ pageContext: { slug, left, right }, data }) => {
  // const pp = usePostQuery();
  // console.log('pp', pp)
  // console.log('data', data);
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) post.id = slug;
  const postWrap = React.useRef(null);
  const tocWrap = React.useRef(null);

  const [toc, setToc] = useState([]);
  const medium = useMediaQuery('900px');

  const views = usePageViews(slug);

  console.log('views', views);

  useEffect(() => {
    const getHeadings = () => {
      let activeEl;

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          let newActiveEl;
          if (entry.isIntersecting) {
            if (tocWrap.current)
              newActiveEl = tocWrap.current.querySelector(
                `[href="#${entry.target.getAttribute('id')}"]`
              );
            if (activeEl) activeEl.style.color = 'var(--color-text)';
            if (newActiveEl) newActiveEl.style.color = 'var(--color-primary)';
            activeEl = newActiveEl;
          }
        });
      };

      if (postWrap.current) {
        const headings = postWrap.current.querySelectorAll(
          'h1, h2, h3, h4, h5, h6'
        );
        const tocArr = [];
        headings.forEach((el) => {
          const hid = el.getAttribute('id');
          const level = Number(el.localName.split('').splice(1, 1).join());

          if (hid) {
            tocArr.push({ hid, level });
            const observer = new IntersectionObserver(observerCallback, {
              threshold: 1,
              root: document,
            });
            observer.observe(el);
          }
        });
        setToc(tocArr);
      } else setTimeout(getHeadings, 1000);
    };

    getHeadings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const TOC = () => {
  //   const convertToSentence = (hid) =>
  //     hid
  //       .split('-')
  //       .join(' ')
  //       .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  //   const sorted = toc.map((item) => item.level).sort();
  //   const highest = sorted[sorted.length - 1];
  //   return (
  //     <TocWrap ref={tocWrap}>
  //       <TocHeader>Table of Contents</TocHeader>
  //       {toc.map((item) => (
  //         <TocItem level={item.level} highest={highest} key={item.hid}>
  //           <TocLink href={'#' + item.hid}>
  //             {convertToSentence(item.hid)}
  //           </TocLink>
  //         </TocItem>
  //       ))}
  //     </TocWrap>
  //   );
  // };
  const TOC = () => {
    const highest = postNode.headings.reduce((acc, c) =>
      acc.depth > c ? acc.depth : c
    );
    return (
      <TocWrap ref={tocWrap}>
        <TocHeader>Table of Contents</TocHeader>
        {postNode.headings.map((item) => (
          <TocItem level={item.depth} highest={highest.depth} key={item.id}>
            <TocLink href={'#' + item.id}>{item.value}</TocLink>
          </TocItem>
        ))}
      </TocWrap>
    );
  };
  return (
    <Layout>
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
      <PostHeadingWrapper>
        <H1>{post.title}</H1>
        <PostDetails
          date={post.date}
          category={post.category}
          ttr={postNode.timeToRead}
        />
      </PostHeadingWrapper>
      <PostMaxWidth>
        <PostContainer>
          <PostWrap
            ref={postWrap}
            article={post.kind === 'TOC'}
            medium={medium}
          >
            {/* <Content input={postNode.body} /> */}
            <Content input={postNode.html} />
            <Line aria-hidden="true" />
            <Tags tags={post.tags} />
            <Suggestions left={left} right={right} />
          </PostWrap>
          {/* {!medium && post.kind === 'TOC' ? <TOC /> : null} */}
          {/* <TOC /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: postNode.tableOfContents }}></div> */}
        </PostContainer>
      </PostMaxWidth>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      tableOfContents
      headings {
        depth
        value
        id
      }
      frontmatter {
        kind
        tags
        category
        title
        chunk
        date
        published
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`;
