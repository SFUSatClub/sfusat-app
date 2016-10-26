import React, { Component, PropTypes } from 'react';
import { 
  StyleSheet,
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  RefreshControl
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewsItem from '../components/NewsItem';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

@connect(
  state => ({
    newsFeed: state.newsFeed
  }),
  dispatch => bindActionCreators(CounterActions, dispatch)
)
export default class NewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramFeed: [],
      refreshing: false,
      counter: 0,
    };
    this.loadInstagramFeed = this.loadInstagramFeed.bind(this);
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      counter: this.state.counter + 1,
    });
    this.loadInstagramFeed();
    // this.loadInstagramFeed().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  loadInstagramFeed() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://jsonplaceholder.typicode.com/posts')
    // feed demo, sfu.satellite id
    // https://smashballoon.com/instagram-feed/demo/?id=3246383861&cols=4
    // instagram json feed, public api
    // https://www.instagram.com/sfu.satellite/media/
    // get large size from items[x].code
    // https://www.instagram.com/p/BITea7bj5nc/media/?size=l
    return fetch('https://www.instagram.com/sfu.satellite/media/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          instagramFeed: responseJson.items,
          refreshing: false,
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.loadInstagramFeed();
  }

  toCounter = () => {
    const { navigate } = this.props;
    navigate({
      type: 'push',
      key: 'counter'
    });
  }

  render() {
    const ipsum = "I don't know what you could say about a day in which you have seen four beautiful sunsets.\n\nMany say exploration is part of our destiny, but it’s actually our duty to future generations and their quest to ensure the survival of the human species.\n\nWe choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win.\n\nProblems look mighty small from 150 miles up.";
    return (
      <ScrollView
        style={{marginTop: -1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['#303F9F']}
          />
        }
      >
        {//this.state.instagramFeed.slice(0, 2).map((entry) => 
        this.state.instagramFeed.map((entry) => 
          <NewsItem
            title={"SFU Satellite Design Club"}
            instagramModel={entry} 
            counter={this.state.counter} 
            toCounter={this.toCounter}
            tabStyle={this.props.tabStyle}
            key={entry.code}
          />
        )}

        <NewsItem 
          title={"SFU Satellite Design Club"}
          provider={"Facebook"}
          content={ipsum}
          img={"img"}
          counter={this.state.counter} 
          toCounter={this.toCounter}
          tabStyle={this.props.tabStyle}/>

        <View style={[this.props.tabStyle.card, {marginBottom: 20}]}>
          <Text>Fraser Space Systems News</Text>
        </View>
      </ScrollView>
    );
  }
}
