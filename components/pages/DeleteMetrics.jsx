import { View, Text } from 'react-native';
import { useState } from 'react';
import DeleteMetricButtonPanel from '../DeleteMetricButtonPanel';
import { LIGHT_GREEN, LIGHT_RED } from '../../lib/constants/colors';

export default function DeleteMetrics(props) {
    const metricCount = props.positiveMetricsArr.length + props.negativeMetricsArr.length;
    const [lastDeletedMetric, setLastDeletedMetric] = useState("");
    
    function deletePositiveMetric (metric) {
        props.updateMetric(
            "delete",
            "positive",
            metric
        );
        setLastDeletedMetric(metric);
    }

    function deleteNegativeMetric (metric) {
        props.updateMetric(
            "delete",
            "negative",
            metric
        );
        setLastDeletedMetric(metric);
    }

    return (
        <View>
            <Text style={{fontSize: 20}}>Delete Metrics</Text>
            {metricCount > 0 ? 
                <View style={{flexDirection: 'row'}}>
                    <DeleteMetricButtonPanel 
                        initialColorHex={LIGHT_GREEN}
                        metricsArr={props.positiveMetricsArr}
                        deleteMetric={deletePositiveMetric}
                    ></DeleteMetricButtonPanel>
                    <DeleteMetricButtonPanel 
                        initialColorHex={LIGHT_RED}
                        metricsArr={props.negativeMetricsArr}
                        deleteMetric={deleteNegativeMetric}
                    ></DeleteMetricButtonPanel>
                </View>
            : <Text style={{fontSize: 20}}>You haven't added any metrics, nothing to delete. </Text>
            }
            <Text>{lastDeletedMetric ? `deleted ${lastDeletedMetric}!`: ""}</Text>
            <Text>{"\n\n"}</Text>
        </View>
        );
}
