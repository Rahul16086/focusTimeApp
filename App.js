/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {AsyncStorage, Platform, StyleSheet, View} from 'react-native';
import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';
import {spacing} from './src/utils/sizes';
import FocusHistory from './src/features/focus/FocusHistory';

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
    setFocusHistory([
      ...focusHistory,
      {key: String(focusHistory.length + 1), subject, completion},
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

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
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
};

export default App;
