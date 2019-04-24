import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default class AccountScreen extends React.Component {
  _renderUserInfo() {
    return (
      <View style={userInfoStyle.container}>
        <Image
          style={userInfoStyle.userAvatar}
          source={require('../assets/user_avatar.png')}
        />
        <Text style={userInfoStyle.userName}>DUNG</Text>
        <Text style={userInfoStyle.userType}>Basic Member</Text>
      </View>
    );
  }

  _renderButton1() {
    const listButton = [
      { key: 'memberCode', title: 'Membership Code', onClick: () => alert('You Clicked: Membership Code') },
      { key: 'coupon', title: 'Coupon', onClick: () => alert('You Clicked: Coupon') },
      { key: 'history', title: 'History', onClick: () => alert('You Clicked: History') },
      { key: 'combo', title: 'Combo', onClick: () => alert('You Clicked: Combo') },
    ];
    return (
      <View>
        {
          listButton.map((buttonInfo, index) => {
            return (
              <TouchableOpacity
                style={buttonStyles.container}
                onPress={buttonInfo.onClick}
              >
                <Text style={buttonStyles.buttonTitle}>{buttonInfo.title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  _renderButton2() {
    const listButton = [
      { key: 'policy', title: 'Term & Policy', onClick: () => alert('You Clicked: Term & Policy') },
      { key: 'logout', title: 'Logout', onClick: () => alert('You Clicked: Logout') },
    ];
    return (
      <View style={{ marginTop: 40 }}>
        {
          listButton.map((buttonInfo, index) => {
            return (
              <TouchableOpacity
                style={buttonStyles.container}
                onPress={buttonInfo.onClick}
              >
                <Text style={
                  buttonInfo.key === 'logout'
                    ? buttonStyles.buttonLogout
                    : buttonStyles.buttonTitle
                }>{buttonInfo.title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this._renderUserInfo()}
        {this._renderButton1()}
        {this._renderButton2()}
      </ScrollView>
    );
  }
}

const userInfoStyle = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 25,
    marginVertical: 15,
  },

  userAvatar: {
    height: 80,
    width: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 40,
  },

  userName: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '400',
  },

  userType: {
    marginTop: 20,
  }
});

const buttonStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1.1,
    borderColor: 'rgb(216,216,216)',
    justifyContent: 'center',
  },

  buttonTitle: {
    marginLeft: 25,
    fontSize: 17,
  },

  buttonLogout: {
    marginLeft: 25,
    fontSize: 17,
    color: 'rgb(233,160,151)',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
