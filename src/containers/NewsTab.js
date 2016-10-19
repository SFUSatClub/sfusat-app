import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
      response: ""
    }
  }

  testApiAsync() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://jsonplaceholder.typicode.com/posts')
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    const movies = this.testApiAsync();
    console.log("is promise: " + (typeof movies.then === 'function'));
    movies.then((response) => {
      console.log("wtf" + response);
      this.setState({
        response: JSON.stringify(response)
      });
    });
  }

  render() {
    return (
      <ScrollView style={this.props.tabStyle.tabView}>
        <View style={this.props.tabStyle.card}>
          <Text>{this.state.response}</Text>
        </View>
        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
        <View style={this.props.tabStyle.card}>
          <Text>Fraser Space Systems News</Text>
        </View>
      </ScrollView>
    );
  }
}
