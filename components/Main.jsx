import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { supabase } from '../lib/supabase';
import UserInterface from './UserInterface';
import alert from '../lib/alertPolyfill';

export default function Main({session}) {
    const [lifetimeScore, setLifetimeScore] = useState(0);
    const [todayScore, setTodayScore] = useState(0);
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
        // console.log("useEffect triggered");
        getMetrics();
        getMetricLogs();

        // Dependency for doing get call to db after metrics are added or removed
      }, [refreshContext]);

    function updateScore (increment) {
        setTodayScore(todayScore + increment);
        setLifetimeScore(lifetimeScore + increment);
        /* TODO/Bugfix: Full re-render is clear with flash
        after each click, consider improving lifetime/today state tracking
        so not necessary to re-call db after every metric log
        Consider pushing score state down to user interface
        so that Main is not required to re-render unless add/delete
        metrics, so it's just a one time calculation.
        Or better separate lifetime and today score totals into
        a separate tab and just keep the home page focused on the metrics
        */
        triggerMetricCallToggle();
    }
    
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
            setTodayScore(todayLogs.length);
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
            updateScore={updateScore}
            triggerMetricCallToggle={triggerMetricCallToggle}
            metrics={metrics}
            metricLogs={metricLogs}
            todayLogs={todayLogs}
            session={session}
        ></UserInterface>
    )
}
