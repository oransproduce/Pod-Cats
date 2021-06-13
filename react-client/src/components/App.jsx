import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import TopBar from './TopBar';
import PodcastList from './PodcastList';
import PodcastDetail from './PodcastDetail';

import searchPodcasts from '../utils/searchPodcasts';

export default function App({ searchTerm, itemDetail, setItemDetail }) {
  const auth = useAuth();
  const [podcasts, setPodcasts] = useState([]);
  const [podDetail, setPodDetail] = useState({});

  const getDefault = () => {
    axios.get('/podcasts').then(({ data }) => {
      console.log(data);
      setPodcasts(data);
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    getDefault();
  }, []);

  useEffect(() => {
    searchPodcasts(searchTerm, setPodcasts);
  }, [searchTerm]);

  const imageClick = (id) => {
    axios.get(`/podcasts/${id}`).then(({ data }) => {
      setPodDetail(data);
      setItemDetail(true);
    }).catch(err => {
      console.log(err);
    });
  };

  const getById = (id) => {
    axios.get(`/podcasts/${id}`).then(({data}) => {
      setPodDetail(data);
      //setItemDetail(true);
    }).catch(err => {
      console.log(err);
    });
  }

  const postReview = (review) => {
    const id = podDetail._id;
    review.username = 'remy';
    axios.post(`/podcasts/${id}/review`, review).then(() => {
      getById(id);
    }).catch(err => {
      console.log(err);
    });
  };

  const renderPageContents = () => (
    itemDetail ? (
      <PodcastDetail postReview={postReview} pod={podDetail} />
    ) : (
      <PodcastList imageClick={imageClick} searchTerm={searchTerm} podcasts={podcasts}/>
    )
  );

  return (
    <>
      {renderPageContents()}
    </>
  );

}
