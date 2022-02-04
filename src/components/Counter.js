import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {fontSize, spacing} from '../utils/sizes';
import KeepAwake from 'react-native-keep-awake';

const Counter = ({minutes = 1, isPaused, onProgress, onEnd}) => {
  const minutesToMilliseconds = min => min * 60000;
  KeepAwake.activate();
  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize.xxxl,
      fontWeight: 'bold',
      color: 'white',
      padding: spacing.lg,
      backgroundColor: 'rgba(59,95,157,0.3)',
    },
  });

  const interval = React.useRef(null);

  const countDown = () => {
    setMilliSeconds(time => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      return time - 1000;
    });
  };

  const [milliSeconds, setMilliSeconds] = useState(null);

  const timeFormatter = time => (time < 10 ? `0${time}` : time);
  const minute = Math.floor(milliSeconds / 60000) % 60;
  const seconds = Math.floor(milliSeconds / 1000) % 60;

  useEffect(() => {
    onProgress(milliSeconds / minutesToMilliseconds(minutes));
    if (milliSeconds === 0) {
      onEnd();
      KeepAwake.deactivate();
    }
  }, [milliSeconds]);

  useEffect(() => {
    setMilliSeconds(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      KeepAwake.deactivate();
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {timeFormatter(minute)}:{timeFormatter(seconds)}
    </Text>
  );
};

export default Counter;
