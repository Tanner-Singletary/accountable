import { Text, View, Button } from 'react-native';
import { useState } from 'react';
import { RED } from '../lib/constants/colors';

export default function MetricButton(props) {
    const [pressed, setPressed] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    function pressButton () {
        setPressed(true);
        setTimesPressed(timesPressed + 1);
        const increment = props.colorHex === RED ? -1: 1;
        props.updateTodayScore(increment);
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10, 
            backgroundColor: pressed ? props.colorHex: props.initialColorHex,
            borderColor: 'black',
            borderWidth: 1
        }}>
            <Button
                title={props.metric}
                onPress={() => pressButton()}
            ></Button>
            <Text>{timesPressed}</Text>
        </View>
        );
}