import { Text, View, Button } from 'react-native';
import { useState } from 'react';
import { RED } from '../lib/constants/colors';

export default function MetricButton(props) {
    const [pressed, setPressed] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    function pressButton (metric) {
        setPressed(true);
        setTimesPressed(pressed + 1);
        const increment = props.colorHex === RED ? -1: 1;
        props.updateTodayScore(increment);
    }
    return (
        <View style={{backgroundColor: pressed ? props.colorHex: props.initialColorHex}}>
            <Button
                title={props.metric}
                onPress={() => pressButton(props.metric)}
            ></Button>
            <Text>{timesPressed}</Text>
        </View>
        );
}
