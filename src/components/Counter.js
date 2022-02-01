import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {fontSize, spacing} from '../utils/sizes';

const Counter = ({minutes = 1, isPaused, onProgress}) => {
  const minutesToMilliseconds = min => min * 60000;

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
        //implement next logic
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMilliseconds(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [milliSeconds, setMilliSeconds] = useState(
    minutesToMilliseconds(minutes),
  );
  const timeFormatter = time => (time < 10 ? `0${time}` : time);
  const minute = Math.floor(milliSeconds / 60000) % 60;
  const seconds = Math.floor(milliSeconds / 1000) % 60;

  return (
    <Text style={styles.text}>
      {timeFormatter(minute)}:{timeFormatter(seconds)}
    </Text>
  );
};

export default Counter;
