import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import { AsyncStorage, Button, FlatList, Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Detergent from '../assets/images/Detergent.jpg';
import Nuts from '../assets/images/Nuts.jpg';

import { MonoText } from '../components/StyledText';

export default class NoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
                Notes:[
                  { date: "2020-08-20T16:56:02.688Z",
                    id: 1596387362688,
                    productName: "Nuts",
                    imageDetail: "Nuts",
                    price: 70,
                    currency: "USD",
                    address: "Nearest store",
                    store: "Your store",
                  },
                  { date: "2020-08-14T16:55:06.574Z",
                    id: 1596387306574,
                    productName: "Detergent",
                    imageDetail: "Detergent",
                    price: 70,
                    currency: "USD",
                    address: "Nearest store",
                    store: "Your store",
                  }
                ]
              };

    this.Item = this.Item.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.Create = this.Create.bind(this);
    this.images = ['detergent.jpg', 'nuts.jpg'];
    this.state.buyProduct = false;
    this.state.buyNote = 0;
    this.state.quantity = 1;
    this.state.filter = false;
    console.log("Notes");
  }
  async saveData(note) {;
    let newNotes = Object.assign( {},this.state.Notes);
    newNotes[note.id] = note;
    this.setState({Notes:newNotes});
    await AsyncStorage.setItem(
            '@Scheduler:note',
            JSON.stringify(newNotes)
          );
  }
  async retrieveData() {
    try {
      const value = await AsyncStorage.getItem('@Scheduler:note');
      if (value !== null) {
        var obj = JSON.parse(value);
        this.state.Notes = obj;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async deleteData(note) {
    var newNotes = Object.assign({}, this.state.Notes);
    delete newNotes[note.id];
    this.setState({Notes:newNotes});
    await AsyncStorage.setItem(
            '@Scheduler:note',
            JSON.stringify(newNotes)
          );
  }

  async buyProduct(note) {
    this.setState({buyNote: note.id});
    this.setState({buyProduct:true});
  }

  Item( item, onPress ) {
      var d = new Date(item.date);
      var name = "Nuts";
      var icon;
      switch (item.imageDetail) {
        case "Nuts": icon = require('../assets/images/Nuts.jpg'); break;
        case "Detergent": icon = require('../assets/images/Detergent.jpg');
      }
      return (
        <TouchableHighlight 
          onPress={onPress}
        >
          <View style={styles.item}>
              <View style={styles.productImage}>
                <Image source={icon} style={{ width: '100%', height: '100%' }} /> 
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}> {item.productName} </Text>

                <Text style={styles.productPrice}> Price: {item.price} {item.currency} </Text>
                <Text style={styles.productPrice}> Store Name: {item.address} </Text>
                <TouchableOpacity style={styles.buyProduct} onPress = {() => this.buyProduct(item)}>
                  <Text> Buy Product </Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableHighlight>
      );
  };

  Create(length) {
    if (!length) {    return (
        <View style={styles.container}>
          <Text  style={{ fontSize: 10, color:'lightgrey' }}>You Haven't Created any Notes</Text>
          <Button
            title="Create Note"
            color="#841584"
            accessibilityLabel="Create a New Note"
          />
        </View>
      );  
    }
  }

  subProduct() {
    if (this.state.quantity > 0) {
      this.setState({quantity: this.state.quantity - 1});
    }
  }
  addProduct() {
      this.setState({quantity: this.state.quantity + 1});
  }
  cancel() {
    this.setState({buyProduct:false});
  }
  cancelFilters() {
    this.setState({filter:false});
  }


  BuyProduct() {
    var item = this.state.Notes[this.state.buyNote];
    var d = new Date(item.date);
    var icon;
    switch (item.imageDetail) {
      case "Nuts": icon = require('../assets/images/Nuts.jpg'); break;
      case "Detergent": icon = require('../assets/images/Detergent.jpg');
    }
    return (
        <View style={styles.cover}>
          <TouchableWithoutFeedback 
            onPress={ () => this.cancel()}
          >
          <View style={styles.cover}></View>
          </TouchableWithoutFeedback>
          <View style={styles.buyMenu}>
            <View style={styles.buyingItem}>
              <View style={styles.productImage}>
                <Image source={icon} style={{ width: '100%', height: '100%' }} /> 
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}> {item.productName} </Text>

                <Text style={styles.productPrice}> Price: {d.toDateString()} </Text>
                <View style={styles.quantity}>
                  
                  <TouchableOpacity style={styles.subProduct} onPress = {() => this.subProduct()}>
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text style = {styles.productQuantity}>{this.state.quantity}</Text>
                  
                  <TouchableOpacity style={styles.addProduct} onPress = {() => this.addProduct()}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buyProduct} onPress = {() => this.buyProduct(item)}>
                  <Text> Buy Product </Text>
                </TouchableOpacity>
              </View>
          </View>
          </View>
        </View>
      );  
  }
  Filter() {
    return (
        <View style={styles.coverFull}>
          <TouchableWithoutFeedback 
            onPress={ () => this.cancelFilters()}
          >
          <View style={styles.coverFull}></View>
          </TouchableWithoutFeedback>
          <View style={styles.buyFilters}>
            <Text style={styles.filterHeader}>Filters</Text>
            <View style={styles.filterRow}>
              <Text>Newest Arrivals</Text>
            </View>
            <View style={styles.filterRow}>
              <Text>Price: Low to High</Text>
            </View>
            <View style={styles.filterRow}>
              <Text>Price: High to Low</Text>
            </View>
          </View>
        </View>
      );  
  }
  addFilter() {
    if(this.state.filter) {
      this.setState({filter: false});
    } else {
      this.setState({filter: true});
    }
  }
  render(){
    this.retrieveData();
    if('route' in this.props) {
      if('params' in this.props.route) {
        if(this.props.route.params !== undefined) {
          if('searchQuery' in this.props.route.params) {
            this.state.query = this.props.route.params.searchQuery;
          }
        }
      }
    }
    if(this.state.hasOwnProperty('query')) {
      if(this.state.query.length > 0) {
        let notes = Object.values(this.state.Notes).filter(
          product => {
            if(this.state.query.indexOf(product.productName) > -1) {
              return true;
            }
            return this.state.query.indexOf(product.imageDetail) > -1;
          }
        );
        this.state.Notes = notes;
      } else {
        this.retrieveData();
      }
    }
    let button, buyingMenu, filter;
    if (!Object.keys(this.state.Notes).length) {
        button = <View style={styles.container}>
          <Text  style={{ fontSize: 10, color:'lightgrey' }}>You Haven't Created any Notes</Text>
          <Button
            title="Create Note"
            color="#841584"
            accessibilityLabel="Create a New Note"
          />
        </View>;
    } else {      
      button = null;
    }
    if(this.state.buyProduct) {
      buyingMenu = this.BuyProduct()
    } else {
      buyingMenu = null;
    }
    if(this.state.filter) {
      filter = this.Filter()
    } else {
      filter = null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(this.state.Notes).reverse()}
          initialScrollIndex = {0}
          renderItem={({ item }) => this.Item(item,() => this.props.navigation.navigate('CreateNote',{onChangeNote:(note) => {console.log("note changed",note);},note:{
          imageDetail:item.imageDetail,
          productName:item.productName,
          id: item.id,
        }}))}
          keyExtractor={item => item.id}
        />
        {button}
        <TouchableOpacity onPress={ () => this.addFilter()} style={styles.newNote}>
          <Text style={styles.addNewNote}>Filter</Text>
        </TouchableOpacity>
        {buyingMenu}
        {filter}
      </View>
    );
  } 
}


const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: '100%',
    position:'absolute',
    zIndex: 15,
    backgroundColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'center',
    elevation:11,
  },
  coverFull: {
    width: '100%',
    height: '100%',
    position:'absolute',
    zIndex: 15,
    backgroundColor:'rgba(0,0,0,0.1)',
    alignItems:'center',
    justifyContent:'center',
    elevation:11,
  },
  buyMenu: {
    width: '90%',
    height: '50%',
    position: 'absolute',
    bottom: '1%',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    zIndex: 20,
    elevation: 20,
  },
  buyFilters: {
    width: '80%',
    height: '30%',
    position: 'absolute',
    top: '1%',
    right: '1%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    zIndex: 20,
    elevation: 20,
  },
  filterHeader: {
    padding:5,
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize:16,
    borderTopRightRadius:10,
  },
  filterRow: {
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderBottomColor: 'lightgrey',
    padding:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'lightgrey',
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'lightgreen',
    width: '100%',
    height: 225,
  },
  buyingItem: {
    backgroundColor: 'lightgrey',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderRadius:20,
  },
  productImage: {
    justifyContent:'center',
    alignItems: 'center',
    width: '35%',
    height: '90%',
  },
  productDetails: {
    padding: 10,
    justifyContent:'center',
    alignItems: 'center',
    display:'flex',
    flexDirection:'column',
  },
  buyProduct: {
    width: '100%',
    color: 'white',
    backgroundColor: 'green',
    padding: 15,
    marginVertical: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize:24,
  },
  productPrice: {
    color: 'brown',
  },
  title: {
    fontSize: 32,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius:10,
    backgroundColor: '#ffa366',
    borderColor: '#666666',
    borderWidth: 1,
    alignItems: 'center',
  },
  subProduct: {
    padding:5,
    paddingHorizontal:10,
    borderRightColor: 'grey',
    borderRightWidth: 1,
  },
  addProduct: {
    padding:5,
    paddingHorizontal:10,
    borderLeftColor: 'grey',
    borderLeftWidth: 1,
  },
  productQuantity: {
    backgroundColor: 'white',
    padding:5,
    paddingHorizontal:10,
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
  newNote: {
    position:'absolute',
    zIndex: 11,
    right:20,
    top:20,
    backgroundColor:'lightblue',
    padding: 5,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
  },
  addNewNote: {
    color:'grey',
    fontSize: 18,
  }
});
