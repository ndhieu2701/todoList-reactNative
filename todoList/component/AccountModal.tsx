import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import baseURL from '../ultis/baseURL';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {updateUser} from '../store/userSlice';
import {setMessage} from '../store/userSlice';

type Props = {
  username: string;
  email: string;
  password: string;
  isEdit: boolean;
  closeEdit: () => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
};

const AccountModal = ({
  username,
  password,
  isEdit,
  closeEdit,
  setPassword,
  setUsername,
}: Props) => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const user = useSelector((state: RootState) => state.user.user);

  const handleUpdateUser = async (userID: string) => {
    if (
      username === user.username &&
      password === '' &&
      confirmPassword === ''
    ) {
      return Alert.alert(
        'Please create new username or password before update',
      );
    }
    if (password !== confirmPassword) {
      return Alert.alert('Passwords not match');
    }

    try {
      const formData = {username: username, password: password};
      const response = await axios.put(
        `${baseURL}/user/update/${userID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const updatedUser = await response.data;
      dispatch(updateUser(updatedUser));
      dispatch(setMessage('Update user sucess'));
      setConfirmPassword('');
      closeEdit();
    } catch (error : any) {
      Alert.alert(error.response.data);
    }
  };
  return (
    <Portal>
      <Modal visible={isEdit} onDismiss={closeEdit}>
        <View style={styles.body}>
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
                outlineColor="#ccc"
                outlineStyle={styles.input}
                spellCheck={false}
                autoFocus
              />
            </View>
          </View>
          <View style={styles.wrap}>
            <View style={styles.wrap}>
              <Text variant="titleMedium">New password</Text>
            </View>
            <View style={styles.wrap}>
              <TextInput
                value={password}
                mode="outlined"
                onChangeText={value => setPassword(value)}
                style={{backgroundColor: '#fff'}}
                outlineColor="#ccc"
                outlineStyle={styles.input}
                spellCheck={false}
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.wrap}>
            <View style={styles.wrap}>
              <Text variant="titleMedium">Confirm password</Text>
            </View>
            <View style={styles.wrap}>
              <TextInput
                value={confirmPassword}
                mode="outlined"
                onChangeText={value => setConfirmPassword(value)}
                style={{backgroundColor: '#fff'}}
                outlineColor="#ccc"
                outlineStyle={styles.input}
                spellCheck={false}
                secureTextEntry
              />
            </View>
          </View>
          <View style={[styles.wrap, styles.action]}>
            <Button
              mode="text"
              style={styles.button}
              onPress={() => {
                closeEdit(), setConfirmPassword('');
              }}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleUpdateUser(user._id)}>
              Update
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
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
  },
});
export default AccountModal;
