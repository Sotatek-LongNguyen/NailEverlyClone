import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator
} from 'react-native';
import MarqueeText from 'react-native-marquee';

import { getNews } from './functions/FetchData';
import TouchableStringFeedback from './components/TouchableSpringFeedback';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getNews()
      .then(newsData => {
        this.setState({
          newsData,
          isLoading: false,
        });
      })
      .catch(err => console.log(err));
  }

  _renderUserInfoBar() {
    return (
      <View style={userInfoBarStyles.container}>
        <Image
          source={require('../assets/user_avatar.png')}
          style={userInfoBarStyles.avatar}
        />
        <View style={userInfoBarStyles.infoContainer}>
          <Text style={userInfoBarStyles.userName}>DUNG</Text>
          <Text style={userInfoBarStyles.userType}>Basic Member</Text>
        </View>
      </View>
    );
  }

  _renderButtonBar() {
    const { width } = Dimensions.get('window');
    const buttonDetails = [
      { key: 'booking', icon: require('../assets/ic_book.png'), title: 'Booking' },
      { key: 'membership', icon: require('../assets/ic_membership.png'), title: 'Membership' },
      { key: 'coupon', icon: require('../assets/ic_coupon.png'), title: 'Coupon' },
    ];
    const buttonWidth = (width - 20 * (buttonDetails.length + 1)) / buttonDetails.length;
    return (
      <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
        {
          buttonDetails.map(buttonInfo => {
            return (
              <TouchableStringFeedback
                renderView={
                  <View style={[buttonBarStyles.container, { width: buttonWidth }]}>
                    <Image
                      source={buttonInfo.icon}
                      style={{ height: 35 }}
                      resizeMode='contain'
                    />
                    <Text style={{ marginTop: 5 }}>{buttonInfo.title}</Text>
                  </View>
                }
              />
            );
          })
        }
      </View>
    );
  }

  _renderNewsItem() {
    const { newsData } = this.state;
    const { width } = Dimensions.get('window');
    const itemWidth = width - 40;
    return (
      <View>
        {
          newsData.map(data => {
            return (
              <TouchableStringFeedback
                onPress={() => Linking.openURL(data.url)}
                renderView={
                  <View
                    style={newsItemStyle.container}
                  >
                    <View style={[newsItemStyle.item, { width: itemWidth, height: itemWidth }]}>
                      <Image
                        style={{ flex: 3, width: itemWidth }}
                        source={{ uri: data.image }}
                        resizeMode='stretch'
                      />
                      <View style={[newsItemStyle.textTitleContainer, { flex: 1 }]}>
                        <MarqueeText
                          style={newsItemStyle.itemTitle}
                          duration={12000}
                          marqueeOnStart
                          loop
                          marqueeDelay={1000}
                          marqueeResetDelay={1000}
                        >
                          {data.title}
                        </MarqueeText>
                        <Text
                          numberOfLines={1}
                          style={newsItemStyle.descriptionText}
                        >
                          {data.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                }
              />
            );
          })
        }
      </View>
    )
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return (
        <View style={mainStyles.loading}>
          <ActivityIndicator size='large' color='rgb(142,181,82)' />
          <Text style={{ color: 'rgb(142,181,82)' }}> Loading...</Text>
        </View>
      );
    return (
      <ScrollView style={mainStyles.container}>
        {this._renderUserInfoBar()}
        {this._renderButtonBar()}
        {this._renderNewsItem()}
      </ScrollView>
    );
  }
}

const userInfoBarStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderWidth: 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    marginBottom: 7,
  },
  userType: {
    color: 'grey',
  }
});

const buttonBarStyles = StyleSheet.create({
  container: {
    height: 80,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
});

const newsItemStyle = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  item: {
    backgroundColor: 'rgb(235,143,171)',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textTitleContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  itemTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionText: {
    color: 'white'
  }
});

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
