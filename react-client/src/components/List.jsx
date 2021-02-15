import React from 'react';
import ListItem from './ListItem.jsx';

const List = ({podcasts}) => (
  <div>
    <h4> List Component </h4>
    There are { podcasts.length } items.
    { podcasts.map(podcast => <ListItem podcast={podcast}/>)}
  </div>
)

export default List;