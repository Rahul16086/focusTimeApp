import React, {useState} from 'react';
import {Platform, StyleSheet, Text, Vibration, View} from 'react-native';
import {spacing} from '../../utils/sizes';
import Counter from '../../components/Counter';
import ButtonRounded from '../../components/ButtonRounded';
import {ProgressBar} from 'react-native-paper';
import TimeToggle from './TimeToggle';

const DEFAULT_TIME = 0.1;
const Timer = ({focusSubject, onTimerEnd, focusReset}) => {
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: spacing.md,
    },
    clearFocus: {
      alignItems: 'center',
    },
  });
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(5000);
    }
  };
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const increaseTime = min => {
    setMinutes(prevState => prevState + min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Counter
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focus on for:</Text>
        <Text style={styles.subject}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar progress={progress} color="#5E84E2" style={{height: 10}} />
      </View>
      <View style={styles.buttonContainer}>
        <TimeToggle onChangeTime={changeTime} onIncreaseTime={increaseTime} />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonRounded
          size={60}
          title={'+30s'}
          onPress={() => {
            increaseTime(0.5);
          }}
        />
        {minutes > 0 && (
          <ButtonRounded
            title={isStarted ? '| |' : '▶'}
            onPress={() => setIsStarted(() => !isStarted)}
          />
        )}
        <ButtonRounded
          size={60}
          title={'+1m'}
          onPress={() => {
            increaseTime(1);
          }}
        />
      </View>
      <View style={styles.clearFocus}>
        <ButtonRounded size={50} title={'❌'} onPress={focusReset} />
      </View>
    </View>
  );
};

export default Timer;
