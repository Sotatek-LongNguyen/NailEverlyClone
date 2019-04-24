import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MapView } from 'expo';
import Carousel from 'react-native-snap-carousel';

import { getEverlyStore } from './functions/FetchData';

export default class StoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      everlyStore: [],
      currentRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0081,
      },
    }
  }

  componentDidMount() {
    getEverlyStore().then(everlyStore => {
      this.setState({
        everlyStore,
        currentRegion: {
          latitude: everlyStore[0].lat,
          longitude: everlyStore[0].long,
          latitudeDelta: 0.0082,
          longitudeDelta: 0.0081,
        },
      });
    })
  }

  _renderEverlyStoreCard = ({ item }) => {
    return (
      <View
        style={everlyStoreCard.container}
      >
        <View style={everlyStoreCard.titleZone}>
          <Text style={everlyStoreCard.storeName}>{item.name}</Text>
          <Text style={everlyStoreCard.storeAddress}>{item.address}</Text>
        </View>
        <TouchableOpacity>
          <View style={everlyStoreCard.directionButton}>
            <Text style={everlyStoreCard.directionButtonTitle}>
              Direction
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onAfterSwipeCard = (index) => {
    const { everlyStore } = this.state;
    this.setState({
      currentRegion: {
        latitude: everlyStore[index].lat,
        longitude: everlyStore[index].long,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0081,
      }
    });
  }

  render() {
    const { width } = Dimensions.get('window');
    const { everlyStore, currentRegion } = this.state;
    return (
      <View style={mainStyles.container}>
        <MapView
          style={mainStyles.mapViewStyle}
          initialRegion={currentRegion}
          region={currentRegion}
        >
          {everlyStore.map(store => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: store.lat,
                  longitude: store.long,
                  latitudeDelta: 0.0082,
                  longitudeDelta: 0.0081,
                }}
                image={require('../assets/tab_location_active.png')}
                title={store.name}
                description={store.address}
              />
            );
          })}
        </MapView>
        <View style={{
          width: '100%',
          position: 'absolute',
          bottom: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Carousel
            data={everlyStore}
            renderItem={this._renderEverlyStoreCard}
            sliderWidth={width}
            itemWidth={width - 70}
            onSnapToItem={this._onAfterSwipeCard}
          />
        </View>
      </View>
    );
  }
}

const everlyStoreCard = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: 'white',
    shadowColor: "#000",
    borderRadius: 7,
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleZone: { 
    marginHorizontal: 15, 
    marginVertical: 15 
  },
  storeName: { 
    fontSize: 20, 
    fontWeight: '600' 
  },
  storeAddress: {
    marginTop: 10,
  },
  directionButton: {
    height: 40,
    width: 100,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'rgb(94,191,170)',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  directionButtonTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapViewStyle: {
    flex: 1,
  }
});
