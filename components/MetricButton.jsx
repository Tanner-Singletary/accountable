import { Text, View, Button } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { theme } from '../lib/constants/theme';
import alert from '../lib/alertPolyfill';

export default function MetricButton(props) {
    const [loading, setLoading] = useState(false);
    const [pressed, setPressed] = useState(Boolean(props.metric.todayCount));
    const [timesPressed, setTimesPressed] = useState(props.metric.todayCount);
    const [lifetimeTimesPressed, setLifetimeTimesPressed] = useState(props.metric.lifetimeCount);
    
    async function logMetricClick() {
        setPressed(true);
        setTimesPressed(timesPressed + 1);
        setLifetimeTimesPressed(lifetimeTimesPressed + 1);
        const increment = props.colorHex === theme.colors.veryBad ? -1: 1;

        try {
            setLoading(true);
            const data = {
              user_id: props.session.user.id,
              metric_id: props.metric.id
            }
      
            const { error } = await supabase.from('metric_logs').insert(data);
      
            if (error) {
              throw error;
            }
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message);
            }
          } finally {
            setLoading(false);
            props.updateScore(increment);
          }
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
                title={props.metric.name}
                onPress={() => logMetricClick()}
                disabled={loading}
            ></Button>
            <Text>Lifetime: {lifetimeTimesPressed}</Text>
            <Text>Today: {timesPressed}</Text>
        </View>
        );
}
