import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';

import { supabase } from './lib/supabase';
import { theme } from './lib/constants/theme';
import Auth from './components/Auth';
import Main from './components/Main';
import Header from './components/Header';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Header></Header>
        <StatusBar style="auto" />
        <View style={styles.body}>
          {session && session.user ? <Main key={session.user.id} session={session} /> : <Auth />}
        </View>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /* NOTE: Padding here is because status bar at top of iphone was naturally 
    getting overlapped by content in various screens (web did not have this issue).
    If padding becomes undesirable, more complicated cross-platform fix available here:
    https://stackoverflow.com/a/39300715/1540350
    */
    padding: theme.spacing.l, // previously was 30
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: '100vh'
  },
  body: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
