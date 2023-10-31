import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { supabase } from '../lib/supabase';
import UserInterface from './UserInterface';
import alert from '../lib/alertPolyfill';

export default function Main({session}) {
    const [todayScore, setTodayScore] = useState(0);
    const [lifetimeScore, setLifetimeScore] = useState(0);
    const [refreshContext, setRefreshContext] = useState(false);
    const [loadingMetrics, setLoadingMetrics] = useState(true);
    const [loadingMetricLogs, setLoadingMetricLogs] = useState(true);
    const [metrics, setMetrics] = useState([]);
    const [metricLogs, setMetricLogs] = useState([]);
    const [todayLogs, setTodayLogs] = useState([]);

    function triggerMetricCallToggle () {
      setRefreshContext(!refreshContext);
    }
    
    useEffect(() => {
        getMetrics();
        getMetricLogs();

        // Dependency for doing get call to db after metrics are added or removed
      }, [refreshContext]);
    
    async function getMetrics() {
        try {
          setLoadingMetrics(true)
          const { data, error, status } = await supabase
            .from('metrics')
            .select(`id,name,category`)
            .eq('user', session.user.id);
          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setMetrics(data);
          }
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        } finally {
          setLoadingMetrics(false);
        }
      }

      async function getMetricLogs() {
        let startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        let endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);

        try {
          setLoadingMetricLogs(true)
          const { data, error, status } = await supabase
            .from('metric_logs')
            .select(`id,created_at,user_id,metric_id`)
            .eq('user_id', session.user.id);
          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setMetricLogs(data);
            setLifetimeScore(data.length);
            let statelessTodayLogs = data.filter(
              (item) => new Date(item.created_at) >= startOfDay && new Date(item.created_at) <= endOfDay
            );
            setTodayLogs(statelessTodayLogs);
            setTodayScore(statelessTodayLogs.length);
          }
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        } finally {
          setLoadingMetricLogs(false);
        }
      }

    return (
        loadingMetrics || loadingMetricLogs ? <Text>Loading...</Text> :
        <UserInterface
            lifetimeScore={lifetimeScore}
            todayScore={todayScore}
            triggerMetricCallToggle={triggerMetricCallToggle}
            metrics={metrics}
            metricLogs={metricLogs}
            todayLogs={todayLogs}
            session={session}
        ></UserInterface>
    )
}
