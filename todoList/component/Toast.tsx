import {useState} from 'react';
import {Snackbar, Text, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setMessage} from '../store/userSlice';

type StringProps = {
  value: string;
};

const Toast = ({value}: StringProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(true);

  const onDismissSnackBar = () => {
    dispatch(setMessage(''));
    setVisible(false);
  };
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      elevation={2}
      duration={3000}
      style={[styles.snackbar, {backgroundColor: '#fff'}]}>
      <Text style={{color: theme.colors.primary}}>{value}</Text>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackbarText: {
    fontSize: 20,
  },
});

export default Toast;
