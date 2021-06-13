import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/auth';

import TopBar from './TopBar';
import PodcastList from './PodcastList';
import PodcastDetail from './PodcastDetail';

import searchPodcasts from '../utils/searchPodcasts';

export default function Main({ searchTerm, itemDetail, setItemDetail }) {
  const { user, loggedin } = useAuth();
  const [podcasts, setPodcasts] = useState([]);
  const [podDetail, setPodDetail] = useState({});

  const getDefault = () => {
    axios.get('/podcasts').then(({ data }) => {
      setPodcasts(data);
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    getDefault();
    loggedin();
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
      setItemDetail(true);
    }).catch(err => {
      console.log(err);
    });
  }

  const postReview = (review) => {
    const id = podDetail._id;
    review.username = user.username;
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
