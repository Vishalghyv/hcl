import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import { AsyncStorage, Button, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import NoteScreen from './Note';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
console.disableYellowBox = true;


const numColumns = 3;
var Clicked = [];
var filterProducts = [];


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { numColumns: 3};
    this.state.Products = [
      {key:'Nuts'},
      {key:'Almond'},
      {key:'Small Products'},
      {key:'Detergent'},
      {key:'Surf Excel'},
      {key:'Other Products'},
      {key:'More Other Products'},
      {key:'Products'},
      {key:'Random'},
      {key:'Other'},
    ];
    this.SearchItem = this.SearchItem.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.SearchBar = this.SearchBar.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
    this.CategoryOption = this.CategoryOption.bind(this);
    this.Options = this.Options.bind(this);
    this.state.Clicked = [];
    this.state.filterProducts = [];

  }
  SearchItem(item) {
    return (
      <View style={styles.options}>
        <Text style={styles.optionItem}>{item.item}</Text>
      </View>
    );
  }

  searchProduct(value) {
    filterProducts = Products.filter(
    name => {
      let productLowercase = name.key.toLowerCase();

      let searchProduct = value.toLowerCase();

      return productLowercase.indexOf(searchProduct) > -1;
    }
    );
  }

  SearchBar() {
    return (
      <View style={styles.searchBar}>
        <View style={styles.bar}>
          <TextInput
            placeholder="Search with Product"
            style={{ fontSize: 18, width: '100%', height: 50, padding: 10, backgroundColor: 'white' }}
            onChangeText = {(value) => searchProduct(value)}
          />
        </View>
        <View style={styles.search}>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={{ backgroundColor: '#5c5c8a' }}>
              <Text 
                style={{ fontSize: 20, color: '#c1c1d7' , padding: 5, textAlign: 'center'}}
              >Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  changeBackground(item) {
      const index = this.state.Clicked.indexOf(item.item);
      if (index > -1) {
        let items = this.state.Clicked;
        items.splice(index, 1);
        this.setState({Clicked:items});
      } else {
        this.setState({Clicked: [...this.state.Clicked, item.item]});
      }
  }

  CategoryOption(item) {
    var style = styles.optionItem
    if(this.state.Clicked.indexOf(item.item)> -1) {
      style = styles.optionSelectedItem
    }
    return (
      <View style={styles.options}>
        <TouchableOpacity
            onPress={() => this.changeBackground(item)}>
          <Text style={style}>{item.item}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  Options() {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Search With Category</Text>
        <FlatList
          data={this.state.Products}
          contentContainerStyle={styles.optionContainer}
          renderItem={({ item }) => <this.CategoryOption item={item.key} />}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Notes', {searchQuery: this.state.Clicked})}
          style={{ backgroundColor: '#5c5c8a' }}>
            <Text 
              style={{ fontSize: 20, color: '#c1c1d7' , padding: 5, textAlign: 'center'}}
            >Apply</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render (){
      return (
      <View style={styles.container}>
        <this.SearchBar />
        <this.Options />
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  category: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  categoryTitle: {
    marginVertical: 10,
    color: '#404040',
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  optionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  options: {
    marginVertical: 13,
    marginHorizontal: 5,
  },
  searchBar: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  optionItem: {
    paddingVertical: 5,
    paddingHorizontal:10,
    borderColor: '#4d94ff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#b3d1ff',
    color: '#4d94ff',
    fontSize: 16,
  },
  optionSelectedItem: {
    paddingVertical: 5,
    paddingHorizontal:10,
    borderColor: '#4d94ff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#4d94ff',
    color: '#b3d1ff',
    fontSize: 16,
  },
  bar: {
    width: '75%',
    backgroundColor: '#c2c2d6',
    padding: 5,
    fontSize: 10,
  },
  search: {
    width: '25%',
    backgroundColor: '#5c5c8a',
    paddingVertical: 10,
    fontSize: 10,
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
