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
    this.testApiAsync = this.testApiAsync.bind(this);
  }

  testApiAsync() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://jsonplaceholder.typicode.com/posts')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          response: JSON.stringify(responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.testApiAsync();
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
