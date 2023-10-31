import { View, Text } from 'react-native';

export default function Profile(props) {
  // TODO: Pass down in props triggerMetricCallToggle();
  // and assign to a 'refresh' button to update the score here.

  return (
    <View style={{flex: 1, marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Lifetime Score: {props.lifetimeScore}</Text>
      <Text>Today's Score: {props.todayScore}</Text>
    </View>
  );
}
