import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import alert from '../../lib/alertPolyfill';

export default function AddMetrics({session, triggerMetricCallToggle}) {
    const defaultPositiveMetric = "New positive metric";
    const defaultNegativeMetric = "New negative metric";
    const [loading, setLoading] = useState(false);
    const [positiveMetric, onChangePositiveMetric] = useState(defaultPositiveMetric);
    const [lastAddedPositiveMetric, setLastAddedPositiveMetric] = useState("");
    const [negativeMetric, onChangeNegativeMetric] = useState(defaultNegativeMetric);
    const [lastAddedNegativeMetric, setLastAddedNegativeMetric] = useState("");

    async function insertMetric(name, category) {
        try {
            console.log("async insertMetric called with:");
            console.log({"name": name, "category": category});
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
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangePositiveMetric}
                value={positiveMetric}
            />
            <Button
                title="Add positive metric"
                onPress={() => updatePositiveMetric(positiveMetric)}
                disabled={loading}
            ></Button>
            <Text>{lastAddedPositiveMetric ? `added ${lastAddedPositiveMetric}!`: ""}</Text>
            <Text>{"\n\n"}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNegativeMetric}
                value={negativeMetric}
            />
            <Button
                title="Add negative metric"
                onPress={() => updateNegativeMetric(negativeMetric)}
                disabled={loading}
            ></Button>
            <Text>{lastAddedNegativeMetric? `added ${lastAddedNegativeMetric}!`: ""}</Text>
            <Text>{"\n\n"}</Text>
        </View>
        );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });