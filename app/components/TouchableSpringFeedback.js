import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

export default class TouchableSpringFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            springValue: new Animated.Value(1),
        }
    }

    _pressInAnim = () => {
        const { springValue } = this.state;
        Animated.spring(springValue, {
            toValue: 0.93,
            friction: 4.5,
            useNativeDriver: true,
        }).start();
    }

    _pressOutAnim = () => {
        const { springValue } = this.state;
        Animated.spring(springValue, {
            toValue: 1,
            friction: 4.5,
            useNativeDriver: true,
        }).start();
    }

    render() {
        const { springValue } = this.state;
        const { renderView, onPress } = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={this._pressInAnim}
                onPressOut={this._pressOutAnim}
            >
                <Animated.View
                    style={
                        [
                            {
                                alignSelf: 'center',
                                transform: [{
                                    scale: springValue,
                                }],
                            }
                        ]}>
                    {renderView}
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    }
});