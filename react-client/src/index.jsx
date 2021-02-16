import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import TopBar from './components/TopBar';
import PodcastList from './components/PodcastList';
import PodcastDetail from './components/PodcastDetail';

let debounce;

const App = (props) => {

  const [podcasts, updatePodcasts] = useState([]);
  const [searchTerm, updateSearch] = useState('');
  const [itemDetail, updateItemDetail] = useState(false);
  const [podDetail, updatePodDetail] = useState({});

  const getDefault = () => {
    axios.get('/podcasts').then(({ data }) => {
      updatePodcasts(data);
    }).catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    getDefault();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      getDefault();
      return;
    }
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      axios.get(`/search/${searchTerm}`).then(({ data }) => {
        updatePodcasts(data);
      }).catch(err => {
        console.log(err);
      });
    }, 350);
  }, [searchTerm]);

  const imageClick = (id) => {
    axios.get(`/podcasts/${id}`).then(({data}) => {
      updatePodDetail(data);
    }).catch(err => {
      console.log(err);
    });
    updateItemDetail(true);
  }

  let mainView;
  if (itemDetail) {
    mainView = (
      <div>
        <TopBar updateItemDetail={updateItemDetail} updateSearch={updateSearch} />
        <PodcastDetail pod={podDetail} />
      </div>
    );
  } else {
    mainView = (
      <div>
        <TopBar updateItemDetail={updateItemDetail} updateSearch={updateSearch} />
        <PodcastList imageClick={imageClick} searchTerm={searchTerm} podcasts={podcasts}/>
      </div>
    );
  }
  return mainView;
}

ReactDOM.render(<App />, document.getElementById('app'));