import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {spacing} from '../../utils/sizes';

const Timer = ({focusSubject}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: 'white',
      textAlign: 'center',
    },
    subject: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  return (
    <View style={styles.container}>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focus on for:</Text>
        <Text style={styles.subject}>{focusSubject}</Text>
      </View>
    </View>
  );
};

export default Timer;
