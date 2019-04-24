import React from 'react';
import { Dimensions, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import TouchableSpringFeedback from './components/TouchableSpringFeedback';
import AccountScreen from './AccountScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import StoreScreen from './StoreScreen';
import TabColors from './values/TabColors';

export default class TabBarScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'home', title: 'Home' },
                { key: 'notification', title: 'Notification' },
                { key: 'store', title: 'Store' },
                { key: 'account', title: 'Account' },
            ],
        }
    }

    _getTabInactiveIconByIndex(i) {
        switch (i) {
            case 0: return require('../assets/tab_home.png');
            case 1: return require('../assets/tab_noti.png');
            case 2: return require('../assets/tab_location.png');
            case 3: return require('../assets/tab_user.png');
            default: return require('../assets/tab_home.png');
        }
    }

    _getTabActiveIconByIndex(i) {
        switch (i) {
            case 0: return require('../assets/tab_home_active.png');
            case 1: return require('../assets/tab_noti_active.png');
            case 2: return require('../assets/tab_location_active.png');
            case 3: return require('../assets/tab_user_active.png');
            default: return require('../assets/tab_home_active.png');
        }
    }

    _renderSceneMap = SceneMap({
        home: HomeScreen,
        notification: NotificationScreen,
        store: StoreScreen,
        account: AccountScreen,
    });

    _renderTabBar = (props) => {
        const tabItemHeight = 50;
        const inputRange = props.navigationState.routes.map((route, i) => i);
        return (
            <View style={mainStyles.tabBarItemContainer}>
                {
                    props.navigationState.routes.map((route, i) => {
                        const { rVal, gVal, bVal } = TabColors.getTabColorByIndex(i);
                        const tabBackgroundColor = Animated.color(
                            Animated.round(
                                Animated.interpolate(props.position, {
                                    inputRange,
                                    outputRange: inputRange.map(inputIndex =>
                                        inputIndex === i ? rVal : 255
                                    ),
                                })
                            ),
                            Animated.round(
                                Animated.interpolate(props.position, {
                                    inputRange,
                                    outputRange: inputRange.map(inputIndex =>
                                        inputIndex === i ? gVal : 255
                                    ),
                                })
                            ),
                            Animated.round(
                                Animated.interpolate(props.position, {
                                    inputRange,
                                    outputRange: inputRange.map(inputIndex =>
                                        inputIndex === i ? bVal : 255
                                    ),
                                })
                            ),
                        );

                        const activeTabWidth = 2 * Dimensions.get('window').width / 5;
                        const inactivateTabWidth = (Dimensions.get('window').width - activeTabWidth) / 3;
                        const tabItemWidth = Animated.interpolate(props.position, {
                            inputRange,
                            outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? activeTabWidth : inactivateTabWidth
                            ),
                        });

                        const opacityText = Animated.interpolate(props.position, {
                            inputRange,
                            outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? 1 : 0,
                            ),
                        });

                        const opacityIcon = Animated.interpolate(props.position, {
                            inputRange,
                            outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? 0 : 1,
                            ),
                        });

                        const textWidth = Animated.interpolate(props.position, {
                            inputRange,
                            outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? activeTabWidth - 65 : 0
                            ),
                        });

                        return (
                            <TouchableSpringFeedback
                                onPress={() => {
                                    this.props.onFinishChangeTab(i);
                                    this.setState({ index: i });
                                }}
                                renderView={
                                    <Animated.View
                                        style={[
                                            mainStyles.tabItemDefaultStyles,
                                            {
                                                height: tabItemHeight,
                                                borderBottomEndRadius: i === 3 ? 0 : tabItemHeight / 2,
                                                borderTopEndRadius: i === 3 ? 0 : tabItemHeight / 2,
                                                borderBottomStartRadius: i === 0 ? 0 : tabItemHeight / 2,
                                                borderTopStartRadius: i === 0 ? 0 : tabItemHeight / 2,
                                                width: tabItemWidth,
                                                backgroundColor: tabBackgroundColor,
                                            }
                                        ]}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View>
                                                <Animated.Image
                                                    style={mainStyles.tabItemIconInactive}
                                                    resizeMode='contain'
                                                    source={this._getTabInactiveIconByIndex(i)}
                                                />
                                                <Animated.Image
                                                    style={[mainStyles.tabItemIconActive, { opacity: opacityIcon }]}
                                                    resizeMode='contain'
                                                    source={this._getTabActiveIconByIndex(i)}
                                                />
                                            </View>
                                            <Animated.Text
                                                numberOfLines={1}
                                                style={
                                                    [
                                                        mainStyles.tabItemTitle,
                                                        {
                                                            width: textWidth,
                                                            opacity: opacityText,
                                                        }]
                                                }
                                            >
                                                {route.title}
                                            </Animated.Text>
                                        </View>
                                    </Animated.View>
                                }
                            />
                        );
                    })
                }
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderSceneMap}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => {
                        this.props.onFinishChangeTab(index);
                        this.setState({ index });
                    }}
                />
            </View>
        );
    }
}

const mainStyles = StyleSheet.create({
    tabBarItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    tabItemDefaultStyles: {
        marginBottom: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabItemIconInactive: {
        width: 25,
        height: 30
    },

    tabItemIconActive: {
        width: 25,
        height: 30,
        position: 'absolute'
    },

    tabItemTitle: {
        color: 'white',
        textAlign: 'right',
    }
});