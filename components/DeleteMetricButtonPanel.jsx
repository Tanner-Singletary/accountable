import { View, Text, FlatList, Button } from 'react-native';
import { LIGHT_RED } from '../lib/constants/colors';

export default function DeleteMetricButtonPanel(props) {
    const textHeader = props.initialColorHex === LIGHT_RED ? "Don't": "Do";
    return (
        <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{textHeader}</Text>
            <FlatList
                style={{backgroundColor: props.initialColorHex}}
                data={props.metricsArr}
                renderItem={
                    ({item}) => <Button
                        title={item.metric}
                        onPress={() => props.deleteMetric(item.metric)}
                    ></Button>
            }
            />
        </View>
        );
}
