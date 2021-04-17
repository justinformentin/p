import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useAllPostsQuery } from '../hooks/useAllPostsQuery';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useMediaQuery } from '../hooks/useMediaQuery';
// import { useMounted } from '../hooks/useMounted';
import { Search } from '@styled-icons/feather/Search';
import { Cross } from '../icons';
import { Link } from 'gatsby';

const SearchBox = styled.div`
  width: 55%;
  background: linear-gradient(45deg, #153e5b, #262b6a);
  border-radius: 5px;
  padding: 1rem 0;
  position: absolute;
  z-index: 50;
  right: 4rem;
  top: 1%;
  z-index: 1010;
  box-shadow: 4px 4px 15px 3px rgba(0, 0, 0, 0.3);
  transition: ${(props) => props.theme.trans.opacity};
  opacity: 0;
  @media (max-width: 750px) {
    width: 100%;
    top: 0;
    right: 0;
  }
`;

const InputContainer = styled.div`
  padding: 0 1rem;
  display: flex;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const CrossWrap = styled.div`
  padding: 0.5rem 0 0.5rem 0.5rem;
  margin-left: 1rem;
  display: flex;
  &:hover {
    cursor: pointer;
  }
  svg {
    stroke: white;
  }
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-top: 1rem;
  @media (max-width: 750px) {
    max-height: 100%;
  }
`;

const ResultWrap = styled.div`
  padding: 0 1rem;
`;

const SearchItem = styled.div`
  margin-bottom: 0.25rem;
  color: white;
  a {
    color: white;
    &:hover {
      color: var(--color-link);
    }
  }
`;

export const SearchContainer = ({
  searchOpen,
  animate,
  fullMenuToggle,
  toggleSearch,
  mounted,
}) => {
  const searchRef = useRef(null);
  const mobile = useMediaQuery('750px');
  const { code, general } = useAllPostsQuery();
  const allPosts = [...code.edges, ...general.edges];

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(allPosts);

  const filterResults = (query) =>
    allPosts.filter(
      (item) =>
        query === '' ||
        item.node.frontmatter.title
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );

  const debouncedResults = useCallback(
    debounce((query) => mounted && setResults(filterResults(query)), 300),
    []
  );

  const handleChange = (e) => mounted && setSearchQuery(e.target.value);

  useOutsideClick(searchRef, () => searchOpen && toggleSearch());

  useEffect(() => {
    debouncedResults(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    searchOpen &&
    createPortal(
      <SearchBox
        ref={searchRef}
        id="search-box"
        style={{ opacity: animate }}
        mobile={mobile}
      >
        <InputContainer>
          <SearchInput
            placeholder="Enter search term"
            onChange={handleChange}
          />
          {mobile && (
            <CrossWrap onClick={toggleSearch}>
              <Cross />
            </CrossWrap>
          )}
        </InputContainer>
        <SearchResults>
          <ResultWrap>
            {results.length > 0 ? (
              results.map(({ node }) => (
                <SearchItem key={node.fields.slug} onClick={fullMenuToggle}>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </SearchItem>
              ))
            ) : (
              <SearchItem>No posts found.</SearchItem>
            )}
          </ResultWrap>
        </SearchResults>
      </SearchBox>,
      document.body
    )
  );
};

export const SearchToggle = ({ toggleMenu }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [animate, setAnimate] = useState(0);

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  const toggleSearch = () => {
    if (searchOpen) {
      mounted.current && setAnimate(0);
      setTimeout(() => mounted.current && setSearchOpen(false), 300);
    } else {
      mounted.current && setSearchOpen(true);
      setTimeout(() => mounted.current && setAnimate(1), 10);
    }
  };
  const fullMenuToggle = () => {
    toggleMenu && toggleMenu();
    toggleSearch();
  };

  return (
    <>
      <Search onClick={toggleSearch} />
      {searchOpen && (
        <SearchContainer
          mounted={mounted.current}
          searchOpen={searchOpen}
          animate={animate}
          fullMenuToggle={fullMenuToggle}
          toggleSearch={toggleSearch}
        />
      )}
    </>
  );
};
