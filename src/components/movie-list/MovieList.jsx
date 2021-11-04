import React, { useState, useEffect } from 'react'

import './movie-list.scss'

import { SwiperSlide, Swiper } from 'swiper/react'


import tmdbApi, { categoryType } from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'

const MovieList = ({id, type, category}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (type !== 'similar') {
        switch (category) {
          case categoryType.movie:
            response = await tmdbApi.getMoviesList(type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(type, { params });
            break;
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setItems(response.results)
    }
    getList()
  }, [category, id, type])

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard  item={item} category={category} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default MovieList;
