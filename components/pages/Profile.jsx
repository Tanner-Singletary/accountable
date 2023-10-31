import { View, Text, Button } from 'react-native';

export default function Profile(props) {

  return (
    <View style={{flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center'}}>
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
