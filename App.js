import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { Session } from '@supabase/supabase-js'

import Main from './components/Main';
import Header from './components/Header';
import { BACKGROUND_LIGHT } from './lib/constants/colors';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <View style={styles.container}>
      <Header></Header>
      {session && session.user ? <Main key={session.user.id} session={session} /> : <Auth />}
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
