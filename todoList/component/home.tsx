import {useState} from 'react';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import TodoList from '../screens/todoList';
import Account from '../screens/account';

const Home = () => {
  const theme = useTheme();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {
      key: 'todo',
      title: 'Todo list',
      focusedIcon: 'view-list',
      unfocusedIcon: 'view-list-outline',
    },
    {
      key: 'account',
      title: 'Account',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    todo: TodoList,
    account: Account,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.colors.primary}
      sceneAnimationType="shifting"
    />
  );
};

export default Home;
