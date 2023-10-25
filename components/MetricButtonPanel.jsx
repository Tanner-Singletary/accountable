import { View, Text, FlatList} from 'react-native';
import { theme } from '../lib/constants/theme';
import MetricButton from './MetricButton';

export default function MetricButtonPanel(props) {
    const textHeader = props.colorHex === theme.colors.veryBad ? "Don't": "Do";
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{textHeader}</Text>
            <FlatList
                style={{backgroundColor: props.initialColorHex}}
                data={props.metrics}
                renderItem={
                    ({item}) => <MetricButton
                        metric={item}
                        initialColorHex={props.initialColorHex}
                        colorHex={props.colorHex}
                        updateScore={props.updateScore}
                        session={props.session}
                    ></MetricButton>
            }
            />
        </View>
        );
}
