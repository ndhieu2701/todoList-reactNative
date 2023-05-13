import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {StackProps} from './welcome';
import backgroundImage from '../assets/background.png';
import {Appbar, Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import {checkEmail, checkPassword} from '../ultis/validate';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import Toast from '../component/Toast';
import {setMessage, setUser} from '../store/userSlice';
import baseURL from '../ultis/baseURL';

const Login = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.user.message);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignin = async () => {
    if (!checkEmail(email)) {
      Alert.alert('Please enter a valid email');
      return;
    }
    if (!checkPassword(password)) {
      Alert.alert('Password must be at least 8 characters ');
      return;
    }
    try {
      const formData = {email: email, password: password};
      const response = await axios.post(`${baseURL}/user/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {token, user} = await response.data;
      dispatch(setUser({token: token, user}));
      dispatch(setMessage('Sign in sucess'));
      props.navigation.navigate('home');
    } catch (error: any) {
      dispatch(setMessage(error.response.data));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        mode="medium"
        style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction
          size={32}
          color="#fff"
          onPress={() => props.navigation.goBack()}
        />
      </Appbar.Header>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.form}>
          <Text
            variant="headlineMedium"
            style={[styles.title, {color: theme.colors.secondary}]}>
            Sign in
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode="outlined"
            outlineColor="transparent"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            mode="outlined"
            outlineColor="transparent"
            style={styles.input}
            secureTextEntry
          />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleSignin}>
            Sign in
          </Button>
        </View>
        {message && <Toast value={message} />}
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
  form: {
    width: '80%',
    minHeight: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: 24,
    height: 52,
    lineHeight: 28,
    width: '80%',
    borderRadius: 10,
    marginVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    minWidth: 200,
    height: 52,
    marginBottom: 8,
    marginTop: 24,
    borderRadius: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
  },
});

export default Login;
