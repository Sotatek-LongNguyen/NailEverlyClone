import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    render() {
        const { titleColor, title } = this.props;
        return (
            <View style={styles.container}>
                <Text
                    style={{ color: titleColor, fontSize: 20 }}
                >
                    {title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
