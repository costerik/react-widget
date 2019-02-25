import React, { Component } from 'react';
import Widget from './components/widget';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Widget url="social-url" interval={5000} posts={10} />
      </div>
    );
  }
}

export default App;
