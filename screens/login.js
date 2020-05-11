import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, YellowBox, TouchableWithoutFeedback, Keyboard, ImageBackground, TouchableOpacity, } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import colors from '../shared/Colors';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
    'Setting a timer for a long period of time',
]);

export default class Login extends Component {
    state = {
        users: [],
        username: '',
        password: '',
    }

    toggleLogIn = async () => {
        await fetch('https://eztreecare.herokuapp.com/ShowKhachHang.php?username=' + this.state.username + '&password=' + this.state.password)
            .then(response => response.json())
            .then(responseJson => {
                try {
                    if (responseJson[0].username == 'verified') {
                        this.props.navigation.navigate('Home', { username: this.state.username });
                    } else {
                        Alert.alert(
                            'Notification',
                            'Password do not match, type again!',
                            [
                                { text: 'OK' },
                            ],
                            { cancelable: false }
                        );
                    }
                }
                catch (error) {
                    // handle Error
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                {/* Body */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Image background */}
                    <ImageBackground
                        source={require('../assets/images/redBackground.jpg')}
                        style={styles.container}
                    >
                        <View style={styles.body}>

                            {/* Title text */}
                            <Text style={[styles.titleText, { paddingTop: 60 }]}>Welcome</Text>
                            <Text style={[styles.titleText, {}]}>Back</Text>

                            {/* Text input */}
                            <View
                                style={{ paddingTop: 50 }}
                            >
                                <TextInput style={styles.textInput}
                                    defaultValue={this.state.username}
                                    placeholderTextColor="white"
                                    placeholder={'Username'}
                                    onChangeText={text => this.setState({ username: text })}
                                />
                                <TextInput style={styles.textInput}
                                    placeholderTextColor="white"
                                    defaultValue={this.state.password}
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ password: text })}
                                    placeholder={'Password'}
                                />
                            </View>


                            {/* Submit */}
                            <View style={styles.bottom} >
                                <Text style={[styles.signUpText]}>Log In</Text>
                                <TouchableOpacity
                                    onPress={this.toggleLogIn}
                                >
                                    <AntDesign
                                        size={40}
                                        name='arrowright'
                                        style={styles.iconSignUp}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* End tag */}
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 18,
        fontFamily: 'quicksand-regular',
        color: colors.white,
    },
    titleText: {
        fontSize: 40,
        fontFamily: 'quicksand-medium',
        color: colors.white,
    },
    iconClose: {
        color: colors.white,
        alignSelf: 'center',
    },
    body: {
        paddingLeft: 35,
    },
    textInput: {
        marginBottom: 40,
        paddingBottom: 10,
        width: '88%',
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        fontSize: 18,
        color: colors.white,
        fontFamily: 'quicksand-regular',
    },
    textInputM: {
        marginBottom: 40,
        paddingBottom: 10,
        width: '88%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        fontSize: 18,
        color: colors.black,
        fontFamily: 'quicksand-regular',
    },
    bottom: {
        width: '93%',
        justifyContent: 'space-between',
        paddingTop: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSignUp: {
        color: colors.black,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 100,
    },
    signUpText: {
        fontSize: 35,
        fontFamily: 'quicksand-regular',
        color: colors.white,
    },
    signUpTextM: {
        fontSize: 35,
        fontFamily: 'quicksand-regular',
        color: colors.black,
    },
    loginWith: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginWithText: {
        fontSize: 18,
        fontFamily: 'quicksand-regular',
        color: colors.white,
    },
    iconSignUpM: {
        color: colors.white,
        backgroundColor: colors.red,
        padding: 10,
        borderRadius: 100,
    },
    bottomM: {
        width: '93%',
        justifyContent: 'space-between',
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
})