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

import Reactotron from 'reactotron-react-native'

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
      response: "Loading...",
      refreshing: false,
      counter: 0,
    };
    this.testApiAsync = this.testApiAsync.bind(this);
  }

  _onRefresh() {
    this.setState({
      response: "Loading...",
      refreshing: true,
      counter: this.state.counter + 1,
    });
    this.testApiAsync();
    // this.testApiAsync().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  testApiAsync() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://jsonplaceholder.typicode.com/posts')
    return fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Reactotron.log({ numbers: [1, 2, 3], boolean: false, nested: { here: 'we go' } });
        this.setState({
          response: JSON.stringify(responseJson),
          refreshing: false,
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.testApiAsync();
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
        <NewsItem 
          title={"SFU Satellite Design Club"}
          provider={"Facebook"}
          content={ipsum}
          img={"img"}
          counter={this.state.counter} 
          toCounter={this.toCounter}
          tabStyle={this.props.tabStyle}/>

        <NewsItem 
          title={"SFU Satellite Design Club"}
          provider={"Instagram"}
          content={this.state.response}
          img={"img"}
          counter={this.state.counter} 
          toCounter={this.toCounter}
          tabStyle={this.props.tabStyle}/>

        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
        <View style={[this.props.tabStyle.card, {marginBottom: 20}]}>
          <Text>Fraser Space Systems News</Text>
        </View>
      </ScrollView>
    );
  }
}
