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
export default class TelemetryTab extends Component {
  render() {
    return (
      <ScrollView style={this.props.tabStyle.tabView}>
        <View style={this.props.tabStyle.card}>
          <Text>Live data</Text>
        </View>
      </ScrollView>
    );
  }
}
