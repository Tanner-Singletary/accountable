import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { theme } from '../../lib/constants/theme';
import alert from '../../lib/alertPolyfill';

export default function AddMetrics({session, triggerMetricCallToggle}) {
  const [loading, setLoading] = useState(false);
  const [positiveMetric, onChangePositiveMetric] = useState("");
  const [lastAddedPositiveMetric, setLastAddedPositiveMetric] = useState("");
  const [negativeMetric, onChangeNegativeMetric] = useState("");
  const [lastAddedNegativeMetric, setLastAddedNegativeMetric] = useState("");

  async function insertMetric(name, category) {
    try {
      setLoading(true);
      const updates = {
        user: session.user.id,
        name: name,
        category: category,
      }

      const { error } = await supabase.from('metrics').insert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
      triggerMetricCallToggle();
    }
  }

  function updatePositiveMetric (positiveMetric) {
    setLastAddedPositiveMetric(positiveMetric);
    insertMetric(positiveMetric, "positive");
  }

  function updateNegativeMetric (negativeMetric) {
    setLastAddedNegativeMetric(negativeMetric);
    insertMetric(negativeMetric, "negative");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.positiveInput}
        onChangeText={onChangePositiveMetric}
        value={positiveMetric}
      />
      <Button
        title="Add new thing to do"
        onPress={() => updatePositiveMetric(positiveMetric)}
        disabled={loading}
      ></Button>
      <Text>{lastAddedPositiveMetric ? `added ${lastAddedPositiveMetric}!`: ""}</Text>
      <Text>{"\n\n"}</Text>
      <TextInput
        style={styles.negativeInput}
        onChangeText={onChangeNegativeMetric}
        value={negativeMetric}
      />
      <Button
        title="Add new thing to avoid"
        onPress={() => updateNegativeMetric(negativeMetric)}
        disabled={loading}
      ></Button>
      <Text>{lastAddedNegativeMetric? `added ${lastAddedNegativeMetric}!`: ""}</Text>
      <Text>{"\n\n"}</Text>
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
  positiveInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: theme.spacing.s,
    backgroundColor: theme.colors.good
  },
  negativeInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: theme.spacing.s,
    backgroundColor: theme.colors.bad
  }
});