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
import darkTheme from '../themes/dark';

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
    });
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  render() {
    const { counter, toCounter, tabStyle, instagramModel } = this.props;

    // get the large version of each image so it crops and looks nicer
    let largeDest = undefined;
    if(instagramModel) {
      largeDest = 'https://www.instagram.com/p/' + instagramModel.code + '/media/?size=l'
      console.log(`largeDest: ${largeDest}`);
    }

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
          {instagramModel ? 
            <Text note>{"Instagram"}</Text>
              :
            <Text note>{this.props.provider}</Text>
          }
        </CardItem>

        <CardItem style={styles.cardItem}>
          <CardItem style={[styles.cardItem, {borderBottomWidth:0}]}>
            {instagramModel ?
              <Text style={{fontWeight:'normal'}}>{instagramModel.caption.text}</Text>
                :
              <Text style={{fontWeight:'normal'}}>{this.props.content}</Text>
            }
          </CardItem>
        </CardItem>

        <CardItem style={[styles.cardItem, {flex: 0}]}>
          {instagramModel ?
            <Image
              style={{flex:0, }}
              resizeMode='cover'
              source={{uri:largeDest}} />
                :
            <Image 
              resizeMode='cover'
              source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          }
        </CardItem>

        <CardItem style={[styles.cardItem, {flexDirection: 'row', justifyContent: 'space-around'}]}>
          <View>
            <Icon name='md-heart' style={{color : darkTheme.customIndigo}} />
          </View>
          <View>
            <Icon name='md-chatboxes' style={{color : darkTheme.customIndigo}} />
          </View>
          <View>
            <Icon name='md-share-alt' style={{color : darkTheme.customIndigo}} />
          </View>
        </CardItem>


      </Card>
    );
  }
}
