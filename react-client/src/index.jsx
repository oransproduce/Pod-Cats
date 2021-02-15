import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: []
    }
  }

  componentDidMount() {
    axios.get('/podcasts').then((response) => {
      console.log(response);
      // this.setState({
      //   podcasts: data,
      // });
    }).catch(err => {
      console.log(err);
    })
  }

  render () {
    const { podcasts } = this.state;
    return (
      <div>
        <h1>Item List</h1>
        <List podcasts={podcasts}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));