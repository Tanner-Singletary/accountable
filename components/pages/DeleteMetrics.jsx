import { View, Switch, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import alert from '../../lib/alertPolyfill';
import { theme } from '../../lib/constants/theme';

export default function DeleteMetrics(props) {
  const [switchState, setSwitchState] = useState(props.metrics);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const toggleSwitch = (item) => {
    let prevState = [ ...switchState];
    for (let obj of prevState) {
      if (obj.name === item.name) {
        obj.staged_to_delete = !obj.staged_to_delete;
      }
    }
    setButtonDisabled(prevState.filter((item)=>item.staged_to_delete === true).length <= 0);
    setSwitchState(prevState);
  }
  async function submitDeletion() {
    const metricNamesToDelete = switchState.filter((item)=>item.staged_to_delete === true).map((item)=>item.name);
    const { error } = await supabase
      .from('metrics')
      .delete()
      .eq('user', props.session.user.id)
      .in('name', metricNamesToDelete)
    props.triggerMetricCallToggle();
    alert("Deletion submitted, return to home page to see remaining metrics.");
  }

  return (
  <View style={styles.container}>
    <Text style={theme.textVariants.subHeader}>Delete Metrics</Text>
    <Text>{"\n"}</Text>
    <FlatList
      data={switchState}
      renderItem={
        ({item}) => 
        <View style={styles.switch}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={item.a ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(item)}
            value={item.staged_to_delete}
          />
          <Text style={styles.switchLabel}>{item.name}</Text>
        </View>
      }
    />
    <Button
      title="Delete"
      onPress={() => alert(
        'Delete all selected?', 'Press OK to permanently delete metrics.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => submitDeletion()
        },
      ])}
      disabled={buttonDisabled}
    ></Button>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: theme.spacing.m, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  switch: {
    flex: 1, 
    flexDirection: 'row', 
    padding: theme.spacing.s
  },
  switchLabel: {
    padding: theme.spacing.s
  }
});