import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {StackProps} from './welcome';
import {Appbar, Avatar, Divider, Text, useTheme} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {checkColor} from '../component/Task';

const TaskDetail = (props: StackProps) => {
  const theme = useTheme();
  const route = useRoute();
  const task: any = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: theme.colors.secondary, height: 100}}>
        <Appbar.BackAction
          size={32}
          color="#fff"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content
          title={<Text style={styles.title}>Task details</Text>}
        />
      </Appbar.Header>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            paddingVertical: 20,
            paddingHorizontal: 20,
          },
        ]}>
        <View style={styles.body}>
          <View style={styles.wrap}>
            <Text variant="headlineMedium">{task.title}</Text>
          </View>
          <View
            style={[
              styles.wrap,
              styles.status,
              {borderColor: checkColor(task.status)},
            ]}>
            <Avatar.Text
              label=""
              style={{backgroundColor: checkColor(task.status)}}
              size={18}
            />
            <Text
              variant="bodyMedium"
              style={{
                marginLeft: 6,
                fontSize: 18,
                color: checkColor(task.status),
              }}>
              {task.status}
            </Text>
          </View>
          <View style={styles.wrap}>
            <Divider bold />
          </View>
          <View style={styles.wrap}>
            <Text variant="bodyMedium" style={{fontSize: 16}}>
              {task.content}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  wrap: {
    marginVertical: 6,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 6,
    minWidth: 140,
    maxWidth: 150,
  },
});

export default TaskDetail;
