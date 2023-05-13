import React from 'react';
import {StyleSheet} from 'react-native';
import {Task, deleteTask} from '../store/taskSlice';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import axios from 'axios';
import baseURL from '../ultis/baseURL';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setMessage} from '../store/userSlice';

type Props = {
  task: Task | null;
  openDialog: boolean;
  handleCloseDialog: () => void;
};

const TodoDialog = ({task, openDialog, handleCloseDialog}: Props) => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  const handleDeleteTask = async (taskID: string) => {
    try {
      const response = await axios.delete(`${baseURL}/tasks/${taskID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const deletedTask = await response.data;
      dispatch(deleteTask(taskID));
      dispatch(setMessage('Delete task success'));
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Portal>
      <Dialog
        visible={openDialog}
        onDismiss={handleCloseDialog}
        style={styles.container}>
        <Dialog.Title style={styles.title}>
          Are you sure to delete this task?
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.content} variant="bodyMedium">
            If you delete that task, it will be permanently deleted.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="text"
            onPress={handleCloseDialog}
            labelStyle={[styles.content, styles.button]}>
            Cancel
          </Button>
          {task && (
            <Button
              mode="contained"
              onPress={() => handleDeleteTask(task._id)}
              labelStyle={[styles.content, styles.button]}>
              Delete
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    color: '#FF4233',
  },
  content: {
    fontSize: 18,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});

export default TodoDialog;
