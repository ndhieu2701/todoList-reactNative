import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import TaskComponent from '../component/Task';
import {Task, setTasks} from '../store/taskSlice';
import TodoListModal from '../component/todoListModal';
import Toast from '../component/Toast';
import axios from 'axios';
import baseURL from '../ultis/baseURL';
import TodoDialog from '../component/todoDialog';
import { setMessage } from '../store/userSlice';

const TodoList = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const message = useSelector((state: RootState) => state.user.message);
  const {_id} = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getAllTasks = async () => {
    try {
      const response = await axios(`${baseURL}/tasks/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const tasks: Task[] = await response.data;
      dispatch(setTasks({tasks: tasks}));
    } catch (error: any) {
      dispatch(setMessage(error.response.data));
    }
  };

  const handleOpenModal = (task: Task) => {
    setOpenModal(true);
    setSelectedTask(task);
  };

  const handleOpenDialog = (task: Task) => {
    setOpenDialog(true);
    setSelectedTask(task)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleCreateTask = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header
        mode="center-aligned"
        style={[styles.header, {backgroundColor: theme.colors.secondary}]}>
        <Appbar.Content title="TO DO LIST" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.body}>
        <Button
          style={[styles.button, {backgroundColor: theme.colors.secondary}]}
          labelStyle={{fontSize: 24, lineHeight: 28}}
          mode="contained"
          onPress={handleCreateTask}>
          Create task
        </Button>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {tasks.map((task, index) => {
            return (
              <TaskComponent
                key={task._id}
                index={index}
                task={task}
                handleOpenDialog={() => handleOpenDialog(task)}
                handleOpenModal={() => handleOpenModal(task)}
              />
            );
          })}
        </ScrollView>
        {openModal && (
          <TodoListModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            task={selectedTask}
          />
        )}
        {openDialog && (
          <TodoDialog
            handleCloseDialog={handleCloseDialog}
            openDialog={openDialog}
            task={selectedTask}
          />
        )}
      </View>
      {message && <Toast value={message} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 100,
  },
  body: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  scrollView: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
    lineHeight: 70,
    letterSpacing: 8,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    height: 52,
    marginVertical: 24,
  },
});

export default TodoList;
