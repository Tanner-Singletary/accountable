import { View, Text, FlatList} from 'react-native';
import { RED } from '../lib/constants/colors';
import MetricButton from './MetricButton';

export default function MetricButtonPanel(props) {
    const textHeader = props.colorHex === RED ? "Don't": "Do";
    return (
        <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{textHeader}</Text>
            <FlatList
                style={{backgroundColor: props.initialColorHex}}
                data={props.metrics}
                renderItem={
                    ({item}) => <MetricButton 
                        metric={item.name}
                        initialColorHex={props.initialColorHex}
                        colorHex={props.colorHex}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButton>
            }
            />
        </View>
        );
}
