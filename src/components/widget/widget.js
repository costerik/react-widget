import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './widget.styles.scss';

export default class Widget extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    posts: PropTypes.number,
    interval: PropTypes.number,
  };

  static defaultProps = {
    posts: 10,
    interval: 5000,
  };

  internalInterval = null;

  componentDidMount() {
    const { props } = this;
    const { interval } = props;

    console.log('Widget mounted...');
    this.internalInterval = setInterval(() => console.log('loop...'), interval);
  }

  componentWillUnmount() {
    console.log('Widget will be unmount...');
    clearInterval(this.internalInterval);
  }

  render() {
    const { url, interval, posts } = this.props;
    return (
      <div className="widget">
        <div className="content">
          Hello Widget {url} {interval} {posts}
        </div>
      </div>
    );
  }
}
