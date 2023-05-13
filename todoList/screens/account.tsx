import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import {
  Appbar,
  Avatar,
  Divider,
  Text,
  useTheme,
  TextInput,
  Button,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AccountModal from '../component/AccountModal';
import Toast from '../component/Toast';
import {clearTask} from '../store/taskSlice';
import {logout} from '../store/userSlice';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const Account = (props: Props) => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user.user);
  const message = useSelector((state: RootState) => state.user.message);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('abcdefghi');

  const openEdit = () => {
    setPassword('');
    setIsEdit(true);
  };

  const closeEdit = () => {
    setUsername(user.username);
    setPassword('abcdefghi');
    setIsEdit(false);
  };

  const handleLogout = () => {
    navigation.navigate('login');
    dispatch(clearTask());
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        mode="center-aligned"
        style={[styles.header, {backgroundColor: theme.colors.secondary}]}>
        <Appbar.Content title="ACCOUNT" titleStyle={styles.title} />
      </Appbar.Header>
      <View
        style={[
          styles.container,
          {paddingVertical: 30, paddingHorizontal: 20},
        ]}>
        <View style={styles.body}>
          <View style={[styles.wrap, {alignItems: 'center'}]}>
            {user.picture && (
              <Avatar.Image source={{uri: user.picture}} size={100} />
            )}
          </View>
          <View style={styles.wrap}>
            <Divider bold />
          </View>
          <View style={styles.wrap}>
            <View style={styles.wrap}>
              <Text variant="titleMedium">Username</Text>
            </View>
            <View style={styles.wrap}>
              <TextInput
                value={username}
                mode="outlined"
                onChangeText={value => setUsername(value)}
                style={{backgroundColor: '#fff'}}
                outlineColor="#000"
                outlineStyle={styles.input}
                spellCheck={false}
                disabled
              />
            </View>
          </View>
          <View style={styles.wrap}>
            <View style={styles.wrap}>
              <Text variant="titleMedium">Email</Text>
            </View>
            <View>
              <TextInput
                value={email}
                mode="outlined"
                onChangeText={value => setEmail(value)}
                style={{backgroundColor: '#fff'}}
                outlineColor="#000"
                outlineStyle={styles.input}
                spellCheck={false}
                disabled
              />
            </View>
          </View>
          <View style={styles.wrap}>
            <View style={styles.wrap}>
              <Text variant="titleMedium">Password</Text>
            </View>
            <View style={styles.wrap}>
              <TextInput
                value={password}
                mode="outlined"
                onChangeText={value => setPassword(value)}
                style={{backgroundColor: '#fff'}}
                outlineColor="#000"
                outlineStyle={styles.input}
                spellCheck={false}
                secureTextEntry
                disabled
              />
            </View>
          </View>
          <View style={[styles.wrap, styles.action]}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => openEdit()}>
              Edit
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleLogout()}>
              Logout
            </Button>
          </View>

          {/* modal */}
        </View>
      </View>
      {isEdit && (
        <AccountModal
          username={username}
          password={password}
          email={email}
          closeEdit={closeEdit}
          setUsername={setUsername}
          setPassword={setPassword}
          isEdit={isEdit}
        />
      )}
      {message && <Toast value={message} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
    lineHeight: 70,
    letterSpacing: 8,
  },
  body: {
    backgroundColor: '#fff',
    padding: 20,
    height: '100%',
    borderRadius: 10,
  },
  wrap: {
    marginVertical: 6,
  },
  input: {
    borderRadius: 10,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginHorizontal: 6,
  },
});
export default Account;
