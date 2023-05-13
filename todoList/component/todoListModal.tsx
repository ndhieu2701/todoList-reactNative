import React, {useState} from 'react';
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {View, StyleSheet, Alert} from 'react-native';
import {Task, addTask, updateTask} from '../store/taskSlice';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import axios from 'axios';
import baseURL from '../ultis/baseURL';
import {setMessage} from '../store/userSlice';

type Props = {
  openModal: boolean;
  handleCloseModal: () => void;
  task?: Task | null;
};

type TaskCreateForm = {
  userID?: string;
  content: string;
  status: string;
  title: string;
};

const PickerItems = [
  {label: 'Not started', value: 'Not started'},
  {label: 'In progress', value: 'In progress'},
  {label: 'Done', value: 'Done'},
  {label: 'Archived', value: 'Archived'},
];

const TodoListModal = ({openModal, handleCloseModal, task}: Props) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<string>(task ? task.content : '');
  const [title, setTitle] = useState<string>(task ? task.title : '');
  const [pickerValue, setPickerValue] = useState<string>(
    task ? task.status : 'Not started',
  );
  const {_id} = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);

  const handleClose = () => {
    setContent('');
    setPickerValue('');
    setTitle('');
    handleCloseModal();
  };

  const handleCreateTask = async () => {
    if (content === '' || title === '' || pickerValue === '')
      return Alert.alert('Please filled all the field!');
    try {
      const formData: TaskCreateForm = {
        userID: _id,
        content: content,
        status: pickerValue,
        title: title,
      };

      const response = await axios.post(`${baseURL}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newTask: Task = await response.data;
      dispatch(addTask(newTask));
      dispatch(setMessage('Create task success'));
      handleClose();
    } catch (error: any) {
      Alert.alert(error.response.data);
    }
  };

  const handleEditTask = async (taskID: string) => {
    try {
      const formData: TaskCreateForm = {
        content: content,
        status: pickerValue,
        title: title,
      };

      const response = await axios.put(`${baseURL}/tasks/${taskID}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newTask: Task = await response.data;
      dispatch(updateTask(newTask));
      dispatch(setMessage('Update task success'));
      handleClose();
    } catch (error: any) {
     Alert.alert(error.response.data);
    }
  };
  return (
    <Portal>
      <Modal
        visible={openModal}
        onDismiss={handleCloseModal}
        contentContainerStyle={[styles.container]}>
        <View>
          <View style={styles.wrap}>
            <Text variant="labelMedium" style={styles.label}>
              Title of task
            </Text>
            <TextInput
              value={title}
              mode="outlined"
              onChangeText={value => setTitle(value)}
              style={{backgroundColor: '#fff'}}
              multiline
              outlineColor="#ccc"
              outlineStyle={styles.input}
              spellCheck={false}
            />
          </View>
          <View style={styles.wrap}>
            <Text variant="labelMedium" style={styles.label}>
              Content of task
            </Text>
            <TextInput
              value={content}
              mode="outlined"
              onChangeText={value => setContent(value)}
              style={{backgroundColor: '#fff'}}
              multiline
              outlineColor="#ccc"
              outlineStyle={styles.input}
              spellCheck={false}
            />
          </View>
          <View style={styles.wrap}>
            <Text variant="labelMedium" style={styles.label}>
              Status of task
            </Text>
            <View style={styles.status}>
              <Picker
                mode="dropdown"
                selectedValue={pickerValue}
                onValueChange={(itemValue, index) => setPickerValue(itemValue)}>
                {PickerItems.map((pickerItem, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={pickerItem.label}
                      value={pickerItem.value}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={[styles.wrap, styles.action]}>
            <Button style={styles.button} mode="text" onPress={handleClose}>
              Cancel
            </Button>
            {!task && (
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleCreateTask}>
                Create
              </Button>
            )}
            {task && (
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => handleEditTask(task._id)}>
                Edit
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 10,
  },
  status: {
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 8,
  },
  wrap: {
    marginVertical: 12,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 12,
    borderRadius: 10,
  },
});

export default TodoListModal;
