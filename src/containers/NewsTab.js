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
          source={"Facebook"}
          content={"Hello"}
          img={"img"}
          counter={this.state.counter} 
          toCounter={this.toCounter}
          response={this.state.response}
          tabStyle={this.props.tabStyle}/>
        <NewsItem 
          counter={this.state.counter} 
          toCounter={this.toCounter}
          response={this.state.response}
          tabStyle={this.props.tabStyle}/>
        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
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
