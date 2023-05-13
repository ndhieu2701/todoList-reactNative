import react from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';

import backgroundImage from '../assets/background.png';
import Logo from '../assets/logo.png';
import {Button} from 'react-native-paper';

export type StackProps = StackScreenProps<ParamListBase>;

const Welcome = (props: StackProps): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.logo}>
          <ImageBackground source={Logo} style={styles.logoImg} />
        </View>
        <View style={styles.action}>
          <Button
            style={styles.button}
            mode="contained"
            labelStyle={styles.text}
            onPress={() => props.navigation.navigate('login')}>
            Sign in
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            labelStyle={styles.text}
            onPress={() => props.navigation.navigate('register')}>
            Sign up
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
  },
  logo: {
    width: 200,
    height: 160,
    marginBottom: 60,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  action: {
    marginTop: 40,
  },
  button: {
    minWidth: 200,
    height: 52,
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 10,
  },
});

export default Welcome;
