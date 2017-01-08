import React, { Component, PropTypes } from 'react';
import { 
  StyleSheet, 
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import darkTheme from '../themes/dark';
import TelemetryPanel from '../components/TelemetryPanel';
import * as CounterActions from '../actions/counter';

@connect(
  state => ({
    newsFeed: state.newsFeed
  }),
  dispatch => bindActionCreators(CounterActions, dispatch)
)
export default class SettingsTab extends Component {
  render() {
    return (
      <ScrollView
        style={{backgroundColor:darkTheme.backgroundColor}}
      >
        <TelemetryPanel 
          flex={1} 
          header={"Settings"}
          style={{margin:20, minHeight:150}}>
        </TelemetryPanel>
      </ScrollView>
    );
  }
}
