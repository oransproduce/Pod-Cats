import React, { useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

import TopBar from './TopBar';
import PodcastList from './PodcastList';
import PodcastDetail from './PodcastDetail';

import searchPodcasts from '../utils/searchPodcasts';

export default function Main({ searchTerm }) {
  const { user, loggedin } = useAuth();
  const history = useHistory();
  const [podcasts, setPodcasts] = useState([]);


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
      history.push({ pathname: `/${data.name}` });
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <PodcastList imageClick={imageClick} searchTerm={searchTerm} podcasts={podcasts} />
  );
}
