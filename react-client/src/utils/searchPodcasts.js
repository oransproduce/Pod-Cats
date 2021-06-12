import debounce from 'lodash.debounce';
import axios from 'axios';

const searchPodcasts = (searchTerm, setPodcasts) => {
  if (searchTerm === '') {
    return;
  }
  axios.get(`/podcasts/search/${searchTerm}`).then(({ data }) => {
    setPodcasts(data);
  }).catch(err => {
    console.log(err);
  });
}

export default debounce(searchPodcasts, 250);