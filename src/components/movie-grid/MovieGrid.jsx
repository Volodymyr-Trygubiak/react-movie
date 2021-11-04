import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss'

import MovieCard from '../movie-card/MovieCard'
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import tmdbApi, { categoryType, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = ({ category, movie }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  console.log('keyword', keyword);
  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        console.log("hello", params);
        switch (category) {
          case categoryType.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
            break;
        }
      } else {
        const params = {
          query: keyword
        }
        response = await tmdbApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    }
    getList();

    return () => {
      setItems([]);
      setPage(1);
      setTotalPage(0);
    }
  }, [category, keyword]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1
      };

      switch (category) {
        case categoryType.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
          break;
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword
      }
      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1)
  }

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {
          items.map((item, i) => <MovieCard category={category} item={item} key={i} />)
        }
      </div>
      {
        page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
          </div>
        ) : null
      }
    </>
  )
}

const MovieSearch = ({ keyword, category }) => {
  const [keywordSearch, setKeywordSearch] = useState(keyword ? keyword : '')
  const history = useHistory();

  const goToSearch = useCallback(
    () => {
      if (keywordSearch.trim().length > 0) {
        history.push(`/${categoryType[category]}/search/${keywordSearch}`);
      }
    },
    [keywordSearch, category, history]
  );

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    }
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    }
  }, [keywordSearch, goToSearch, history]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keywordSearch}
        onChange={(e) => setKeywordSearch(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>Search</Button>
    </div>
  )
}

export default MovieGrid
