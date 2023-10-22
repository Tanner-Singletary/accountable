import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AddMetrics(props) {
    const defaultPositiveMetric = "New positive metric";
    const defaultNegativeMetric = "New negative metric";
    const [positiveMetric, onChangePositiveMetric] = useState(defaultPositiveMetric);
    const [lastAddedPositiveMetric, setLastAddedPositiveMetric] = useState("");
    const [negativeMetric, onChangeNegativeMetric] = useState(defaultNegativeMetric);
    const [lastAddedNegativeMetric, setLastAddedNegativeMetric] = useState("");

    function updatePositiveMetric (positiveMetric) {
        props.updateMetric(
            "add",
            "positive",
            positiveMetric
        );
        setLastAddedPositiveMetric(positiveMetric);
    }

    function updateNegativeMetric (negativeMetric) {
        props.updateMetric(
            "add",
            "negative", 
            negativeMetric
        );
        setLastAddedNegativeMetric(negativeMetric);
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