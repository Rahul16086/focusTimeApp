/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';
import {spacing} from './src/utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141B29',
    paddingTop: Platform.OS === 'android' ? spacing.md : spacing.lg,
  },
});
const App: () => Node = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addSubjectToFocusHistory = (subject, completion) => {
    setFocusHistory([...focusHistory], {subject, completion});
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addSubjectToFocusHistory(focusSubject, true);
            setFocusSubject(null);
          }}
          focusReset={() => {
            addSubjectToFocusHistory(focusSubject, false);
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
};

export default App;
