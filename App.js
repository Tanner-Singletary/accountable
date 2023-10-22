import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Main from './components/Main';
import Header from './components/Header';
import { BACKGROUND_LIGHT } from './lib/constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Main></Main>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /* TODO: Padding here is because status bar at top of iphone was naturally getting overlapped by content in 
    various screens (web did not have this issue).
    If padding becomes undesirable, more complicated cross-platform fix available here:
    https://stackoverflow.com/a/39300715/1540350
    */
    padding: 30,
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
