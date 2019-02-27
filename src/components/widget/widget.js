import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isURL } from 'validator';
import cuid from 'cuid';

import Card from '../card';
import FacebookCard from '../facebookCard';
import TwitterCard from '../twitterCard';
import api from '../../service';

import { socialNetwork } from '../../utilities/helpers';

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

  async componentDidMount() {
    const { props, requestsData } = this;
    const { interval, url } = props;
    if (isURL(url.trim())) {
      await requestsData();
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

  populateData = (url, data) => {
    switch (socialNetwork(url)) {
      case 'facebook':
        return data.map(post =>
          FacebookCard(Card, cuid(), {
            authorName: post.from.name,
            avatarId: post.from.id,
            messageBody: post.message,
            postDate: post.created_time,
            facebookId: post.facebook_id.split('_')[1],
          })
        );
      case 'twitter':
        return data.map(post =>
          TwitterCard(Card, cuid(), {
            authorName: post.user.name,
            profileImage: post.user.profile_image_url,
            messageBody: post.text,
            postDate: post.created_at,
            screenName: post.user.screen_name,
            idStr: post.id_str,
            entities: post.entities,
          })
        );
      case 'instagram':
        break;
      case 'google_plus':
        break;
      case 'rss':
        break;
      default:
        break;
    }
  };

  render() {
    const { populateData } = this;
    const { data, loading } = this.state;
    const { url } = this.props;

    return (
      <div className="widget">
        <div className="widget--content">
          <div className="widget--loading">{loading && <span role="img">🤔</span>} </div>
          <div className="widget--title">Posts</div>
          {data && !!data.length ? populateData(url, data) : <div> {'No posts 😕'} </div>}
        </div>
      </div>
    );
  }
}
