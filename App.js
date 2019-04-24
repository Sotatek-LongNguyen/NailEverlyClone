import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Constants } from 'expo';

import Header from './app/components/Header';
import TabBarScreen from './app/TabBarScreen';
import TabColors from './app/values/TabColors';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { rVal, gVal, bVal } = TabColors.getTabColorByIndex(0);
    this.state = {
      titleColor: 'rgb(' + rVal.toString() + ',' + gVal.toString() + ',' + bVal.toString() + ')',
    }
  }

  _changeTabTitleColorByIndex = (index) => {
    const { rVal, gVal, bVal } = TabColors.getTabColorByIndex(index);
    let titleColor = 'rgb(' + rVal.toString() + ',' + gVal.toString() + ',' + bVal.toString() + ')';
    this.setState({ titleColor });
  }

  render() {
    const { titleColor } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor='transparent'
          barStyle='dark-content'
        />
        <Header
          title='Nail Everly 29'
          titleColor={titleColor}
        />
        <TabBarScreen
          onFinishChangeTab={this._changeTabTitleColorByIndex}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
