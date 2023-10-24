import { View, Text } from 'react-native';
import MetricButtonPanel from '../MetricButtonPanel';
import { theme } from '../../lib/constants/theme';

export default function Home(props) {
    return (
        <View style={{flex: 1, marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Today's Score: {props.todayScore}</Text>
            {props.metrics.length > 0 ? 
                <View style={{flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <MetricButtonPanel 
                        initialColorHex={theme.colors.good}
                        colorHex={theme.colors.veryGood}
                        metrics={props.metrics.filter((item) => item.category==="positive")}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButtonPanel>
                    <MetricButtonPanel 
                        initialColorHex={theme.colors.bad}
                        colorHex={theme.colors.veryBad}
                        metrics={props.metrics.filter((item) => item.category==="negative")}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButtonPanel>
                </View>
            : <Text style={{fontSize: 20}}>Click 'Add Metrics' below to get started! </Text>
            }
            <Text>{"\n"}</Text>
        </View>
        );
}
