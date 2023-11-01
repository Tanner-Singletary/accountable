import { View, Text, Button, StyleSheet } from 'react-native';
import { theme } from '../../lib/constants/theme';

export default function Profile(props) {

  return (
    <View style={styles.container}>
      <Text>Lifetime Score: {props.lifetimeScore}</Text>
      <Text>Today's Score: {props.todayScore}</Text>
      <Text>{"\n\n"}Click to refresh scores</Text>
      <Text>(returns you to home page){"\n\n"}</Text>
      <Button
        title="Refresh"
        onPress={() => props.triggerMetricCallToggle()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: theme.spacing.l, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});