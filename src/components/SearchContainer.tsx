import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useAllPostsQuery } from '../hooks/useAllPostsQuery';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Search } from '@styled-icons/feather/Search';
import debounce from 'lodash/debounce';

const SearchBox = styled.div`
  width: 55%;
  background: #eef4ff;
  border-radius: 5px;
  padding: 1rem 0;
  position: absolute;
  z-index: 50;
  right: 4rem;
  top: 1%;
  box-shadow: 4px 4px 15px 3px rgba(0, 0, 0, 0.3);
  transition: all ease 0.3s;
  opacity: 0;
  @media (max-width: 900px) {
    width: 85%;
    top: 0.5rem;
  }
  @media (max-width: 750px) {
    width: 85%;
  }
`;

const InputContainer = styled.div`
  padding: 0 1rem;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ResultWrap = styled.div`
  padding: 0 1rem;
`;

const SearchItem = styled.div`
    margin-bottom: 0.25rem;

  a {
    &:hover {
      color: blue;
    }
  }
`;

export const SearchContainer = () => {
  const searchRef = useRef(null);
  const { code, general } = useAllPostsQuery();
  const allPosts = [...code.edges, ...general.edges];

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(allPosts);
  const [searchOpen, setSearchOpen] = useState(false);
  const [animate, setAnimate] = useState(0);

  const toggleSearch = () => {
    if (searchOpen) {
      setAnimate(0);
      setTimeout(() => setSearchOpen(false), 300);
    } else {
      setSearchOpen(true);
      setTimeout(() => setAnimate(1), 10);
    }
  };

  useOutsideClick(searchRef, () => searchOpen && toggleSearch());

  const filterResults = (query) =>
    allPosts.filter(
      (item) =>
        query === '' ||
        item.node.frontmatter.title.toLowerCase().indexOf(query) !== -1
    );

  const debouncedResults = useCallback(
    debounce((query: any) => setResults(filterResults(query)), 300),
    []
  );

  const handleChange = (e) => setSearchQuery(e.target.value);

  useEffect(() => {
    debouncedResults(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <Search onClick={toggleSearch} />
      {searchOpen && (
        <SearchBox ref={searchRef} id="search-box" style={{ opacity: animate }}>
          <InputContainer>
            <SearchInput
              placeholder="Enter search term"
              onChange={handleChange}
            />
          </InputContainer>
          <SearchResults>
            <ResultWrap>
              {results.length > 0 ? (
                results.map(({ node }) => (
                  <SearchItem key={node.fields.slug}>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </SearchItem>
                ))
              ) : (
                <SearchItem>No posts found.</SearchItem>
              )}
            </ResultWrap>
          </SearchResults>
        </SearchBox>
      )}
    </>
  );
};
