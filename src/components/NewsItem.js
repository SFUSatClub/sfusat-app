import React, { 
  Component, 
  PropTypes,
} from 'react';

import { 
  StyleSheet,
  View, 
  Image,
  TouchableOpacity, 
} from 'react-native';

import { 
  Container, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Icon,
  Button,
} from 'native-base';

import Immutable from 'immutable';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    minHeight: 150,
    margin: 20,
    marginBottom: 0,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  newCard: {
    flex: 0,
    padding: -1,
    marginBottom: 15,
  },
  cardItemH: {
    //borderBottomWidth: 0,
  },
  cardItem: {
    //borderBottomWidth: 0,
  },
});

export default class NewsItem extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    Image.getSize('https://liquiddandruff.github.io/reveal.js/cubesat.jpg', (width, height) => {
      console.log("cubesat h: " + height);
    });
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  render() {
    const { counter, toCounter, tabStyle } = this.props;
    return (
      <Card 
        style={styles.newCard}
        onLayout={(event) => {
          const {x, y, width, height} = event.nativeEvent.layout;
          this.setState({imageWidth: width});
        }}
      >
        <CardItem style={styles.cardItemH}>
          <Thumbnail size={50} source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          <Text>{this.props.title}</Text>
          <Text note>{this.props.provider}</Text>
        </CardItem>

        <CardItem style={styles.cardItem}>
          <CardItem style={[styles.cardItem, {borderBottomWidth:0}]}>
            <Text style={{fontWeight:'normal'}}>{this.props.content}</Text>
          </CardItem>
        </CardItem>


        <CardItem style={styles.cardItem}>
          <Image 
            resizeMode='cover' source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          {/*<Image 
            style={{width:this.state.imageWidth, height:this.state.imageHeight}} 
            resizeMode='contain' source={require('./cubesat.jpg')} /> */}
          {/*<Image resizeMode='contain' style={{marginLeft:-300}} source={require('./cubesat.jpg')} />*/}
        </CardItem>

        <CardItem style={[styles.cardItem, {flexDirection: 'row', justifyContent: 'space-around'}]}>
          <View>
            <Icon name='md-heart' style={{color : '#ED4A6A'}} />
          </View>
          <View>
            <Icon name='md-chatboxes' style={{color : '#ED4A6A'}} />
          </View>
          <View>
            <Icon name='md-share-alt' style={{color : '#ED4A6A'}} />
          </View>
        </CardItem>


      </Card>
    );
  }
}
