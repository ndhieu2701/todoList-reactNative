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
import {setMessage} from '../store/userSlice';
import {RootState} from '../store';
import Toast from '../component/Toast';
import baseURL from '../ultis/baseURL';

const Register = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.user.message);

  const handleSignup = async () => {
    if (!username) {
      Alert.alert('Error', 'Please create username');
      return;
    }
    if (!checkEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (!checkPassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters ');
      return;
    }

    if (!checkPassword(confirmPassword)) {
      Alert.alert('Error', 'Confirm password must be at least 8 characters ');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const formData = {username: username, email: email, password: password};
      const response = await axios.post(`${baseURL}/user/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const user = await response.data;
      dispatch(setMessage('Sign in success'));
      props.navigation.navigate('login');
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
            Sign up
          </Text>
          <TextInput
            label="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            mode="outlined"
            outlineColor="transparent"
            style={styles.input}
          />
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
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            mode="outlined"
            outlineColor="transparent"
            style={styles.input}
            secureTextEntry
          />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleSignup}>
            Sign up
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
    paddingVertical: 20,
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

export default Register;
