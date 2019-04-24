import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class NotificationScreen extends React.Component {
  _renderNoNotification() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../assets/no_notification.png')}
          style={{ height: 150, width: 150 }}
          resizeMode='contain'
        />
        <Text style={{ marginTop: 20, color: 'grey', fontSize: 20 }}>No Items</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderNoNotification()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
