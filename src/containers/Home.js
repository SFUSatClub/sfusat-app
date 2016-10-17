import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import CustomTabBar from '../components/CustomTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import darkTheme from '../themes/dark.js'

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
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
        <ScrollView tabLabel="ios-paper" style={styles.tabView}>
          <Content style={styles.card}>
            <Text style={styles.welcome}>Fraser Space Systems News</Text>
            <TouchableOpacity onPress={this.toCounter}>
              <Text style={styles.instructions}></Text>
            </TouchableOpacity>
          </Content>
        </ScrollView>
        <ScrollView tabLabel="md-planet" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Live data</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="md-school" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Learning</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="md-notifications" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="md-settings" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Settings</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}
