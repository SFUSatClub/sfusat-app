import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/CustomTabBar';
import NewsTab from '../containers/NewsTab';
import TelemetryTab from '../containers/TelemetryTab';
import LearningTab from '../containers/LearningTab';
import NotificationsTab from '../containers/NotificationsTab';
import SettingsTab from '../containers/SettingsTab';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import darkTheme from '../themes/dark.js'

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    minHeight: 150,
    padding: 15,
    margin: 20,
    marginBottom: 0,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default class Home extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  toCounter = () => {
    const { navigate } = this.props;
    navigate({
      type: 'push',
      key: 'counter'
    });
  }

  render() {
    return (
      <ScrollableTabView
        style={{marginTop: 10, }}
        initialPage={0}
        renderTabBar={() => <CustomTabBar underlineStyle={{height:3}}/>}
      >
        <NewsTab tabLabel="ios-paper" tabStyle={styles} navigate={this.props.navigate}/>
        <TelemetryTab tabLabel="md-planet" tabStyle={styles}/>
        <LearningTab tabLabel="md-school" tabStyle={styles}/>
        <NotificationsTab tabLabel="md-notifications" tabStyle={styles}/>
        <SettingsTab tabLabel="md-settings" tabStyle={styles}/>
      </ScrollableTabView>
    );
  }
}
