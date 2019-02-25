import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isURL } from 'validator';
import cuid from 'cuid';

import Card from '../card';
import api from '../../service';

import './widget.styles.scss';

export default class Widget extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    posts: PropTypes.number,
    interval: PropTypes.number,
  };

  static defaultProps = {
    posts: 10,
    interval: 5000,
  };

  state = {
    data: null,
    loading: false,
  };

  internalInterval = null;

  componentDidMount() {
    const { props, requestsData } = this;
    const { interval, url } = props;
    if (isURL(url.trim())) {
      this.internalInterval = setInterval(requestsData, interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.internalInterval);
  }

  requestsData = async () => {
    await new Promise(resolve => this.setState({ loading: true }, () => resolve()));
    const { url, posts } = this.props;
    const result = await api({ url, limit: posts });
    await new Promise(resolve => this.setState({ data: result, loading: false }, () => resolve()));
  };

  render() {
    const { url, interval, posts } = this.props;
    const { data, loading } = this.state;

    return (
      <div className="widget">
        <div className="content">
          Hello Widget {url} {interval} {posts}
          {data &&
            data.map(post => (
              <Card
                key={cuid()}
                authorName={post.from.name}
                messageBody={post.message}
                postDate={post.created_time}
              />
            ))}
        </div>
      </div>
    );
  }
}
