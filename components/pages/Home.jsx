import { View, Text } from 'react-native';
import MetricButtonPanel from '../MetricButtonPanel';
import { LIGHT_GREEN, GREEN, LIGHT_RED, RED } from '../../lib/constants/colors';

export default function Home(props) {
    const metricCount = props.positiveMetricsArr.length + props.negativeMetricsArr.length;
    // TODO: Uncomment block for opt in premium users only
    /*
    let expectedDonation = 0.00;
    let expectedBill = 1.00;

    if (props.todayScore < 0) {
        expectedDonation = 0.00;
        expectedBill = 2.00;
    } else if (props.todayScore > 0){
        expectedDonation = 0.50;
        expectedBill = 1.00;
    }
    */
    return (
        <View style={{flex: 5, alignItems: 'center'}}>
            {/* <Text>Lifetime Donations: $0.00</Text>
            <Text>Today's Bill: ${expectedBill}</Text>
            <Text>Today's Donation: ${expectedDonation}</Text>
            <Text>{"\n"}</Text> */}
            <Text>Today's Score: {props.todayScore}</Text>
            <Text>{"\n"}</Text>
            {metricCount > 0 ? 
                <View style={{flexDirection: 'row'}}>
                    <MetricButtonPanel 
                        initialColorHex={LIGHT_GREEN}
                        colorHex={GREEN}
                        metricsArr={props.positiveMetricsArr}
                        updateTodayScore={props.updateTodayScore}
                    ></MetricButtonPanel>
                    <MetricButtonPanel 
                        initialColorHex={LIGHT_RED}
                        colorHex={RED}
                        metricsArr={props.negativeMetricsArr}
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
