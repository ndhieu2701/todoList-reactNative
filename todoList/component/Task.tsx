import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Avatar, Button, Text, useTheme} from 'react-native-paper';
import {Task} from '../store/taskSlice';
import {useNavigation} from '@react-navigation/native';
import { StackProps } from '../screens/welcome';

type Props = {
  index: number;
  task: Task;
  handleOpenModal: () => void;
  handleOpenDialog: () => void;
};

export const colors = [
  {status: 'Not started', color: '#ccc'},
  {status: 'Done', color: '#6c9b7d'},
  {status: 'In progress', color: '#5b97bd'},
  {status: 'Archived', color: '#ccc'},
];

export const checkColor = (status: string) => {
  const colorObject = colors.find(c => c.status === status);
  return colorObject ? colorObject.color : undefined;
};

const TaskComponent = ({
  index,
  task,
  handleOpenDialog,
  handleOpenModal,
}: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<StackProps['navigation']>();
  return (
    <View style={styles.container}>
      <View style={styles.index}>
        <Text
          variant="bodySmall"
          style={[styles.text, {color: theme.colors.primary}]}>
          {index + 1}
        </Text>
      </View>
      <Pressable
        style={styles.title}
        onPress={() => navigation.navigate('taskDetail', task)}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="bodyMedium"
          style={[styles.text, {color: theme.colors.primary, fontWeight: "bold", paddingRight: 10}]}>
          {task.title}
        </Text>
      </Pressable>
      <View style={styles.status}>
        <Avatar.Text
          label=""
          style={{backgroundColor: checkColor(task.status)}}
          size={18}
        />
        <Text
          style={[
            styles.text,
            {marginLeft: 12, marginRight: 8, color: checkColor(task.status)},
          ]}>
          {task.status}
        </Text>
      </View>
      <View style={styles.action}>
        <Button mode="contained" onPress={() => handleOpenModal()}>
          Edit
        </Button>
        <Button onPress={() => handleOpenDialog()}>Delete</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
  },
  index: {
    width: '5%',
  },
  title: {
    width: '45%',
    paddingHorizontal: 4,
  },
  status: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  action: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 6,
  },
});
export default TaskComponent;
