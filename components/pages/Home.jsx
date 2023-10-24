import { View, Text } from 'react-native';
import MetricButtonPanel from '../MetricButtonPanel';
import { LIGHT_GREEN, GREEN, LIGHT_RED, RED } from '../../lib/constants/colors';

export default function Home(props) {
    return (
        <View style={{flex: 5, alignItems: 'center'}}>
            <Text>Today's Score: {props.todayScore}</Text>
            <Text>{"\n"}</Text>
            {props.metrics.length > 0 ? 
                <View style={{flexDirection: 'row'}}>
                    <MetricButtonPanel 
                        initialColorHex={LIGHT_GREEN}
                        colorHex={GREEN}
                        metrics={props.metrics.filter((item) => item.category==="positive")}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButtonPanel>
                    <MetricButtonPanel 
                        initialColorHex={LIGHT_RED}
                        colorHex={RED}
                        metrics={props.metrics.filter((item) => item.category==="negative")}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButtonPanel>
                </View>
            : <Text style={{fontSize: 20}}>Click 'Add Metrics' below to get started! </Text>
            }
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
        </View>
        );
}
