/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      isLoading: true,
    }
  }

  componentDidMount(){
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return (
        <SafeAreaView>
          <View style={styles.container}>
          </View>
        </SafeAreaView>
      );
    }
    else{
      return(
        <SafeAreaView>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => 
            <SafeAreaView>
              <View style={styles.card}>
                <Text style={styles.text}>{item.userId}, {item.title}</Text>
              </View>
            </SafeAreaView>
            }
            keyExtractor={({id}, index) => id}
          />
        </SafeAreaView>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  card:{
    margin: 10,
    padding: 10,
    backgroundColor: '#DDD',
    borderRadius: 8,
    elevation: 7,
    shadowOffset:{  width: 1000,  height: 1000},
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 25,
  }
});

export default App;
