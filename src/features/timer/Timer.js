import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {spacing} from '../../utils/sizes';
import Counter from '../../components/Counter';
import ButtonRounded from '../../components/ButtonRounded';
import {ProgressBar} from 'react-native-paper';

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
    counter: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.md,
    },
  });

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Counter isPaused={!isStarted} onProgress={onProgress} />
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focus on for:</Text>
        <Text style={styles.subject}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar progress={progress} color="#5E84E2" style={{height: 10}} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonRounded
          title={isStarted ? '| |' : 'Start'}
          onPress={() => setIsStarted(() => !isStarted)}
        />
      </View>
    </View>
  );
};

export default Timer;
