import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { supabase } from '../lib/supabase';
import UserInterface from './UserInterface';
import alert from '../lib/alertPolyfill';

export default function Main({session}) {
    const [todayScore, setTodayScore] = useState(0);
    const [activePage, setActivePage] = useState("home");
    const [loadingMetrics, setLoadingMetrics] = useState(false);
    const [loadingMetricLogs, setLoadingMetricLogs] = useState(false);
    const [metrics, setMetrics] = useState([]);
    const [metricLogs, setMetricLogs] = useState([]);

    useEffect(() => {
        getMetrics();
        getMetricLogs();

        /* activePage as dependency allows for refresh to display newly added metrics
        when navigating back to the home page, with the drawback that it unnecessarily
        does a GET call when changing to other pages (i.e. add metrics). Adding the
        metrics arrays was attempted but resulted in infinite loop. 
        TODO: Simplify / create state variable that is only changed upon
        navigating back specifically to home page, such as a wrapper around setActivePage
        unless there is confirmed reasons to need to re-render upon another page change
        in which case specifying which pages and only altering the state variable
        when one of those pages is changed (as opposed to any page change).
        */
      }, [activePage]);

    function updateTodayScore (increment) {
        setTodayScore(todayScore + increment);
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
            let todaysLogs = data.filter(
              (item) => new Date(item.created_at) >= startOfDay && new Date(item.created_at) <= endOfDay
            );
            setTodayScore(todaysLogs.length);
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
            todayScore={todayScore}
            updateTodayScore={updateTodayScore}
            activePage={activePage}
            setActivePage={setActivePage}
            metrics={metrics}
            metricLogs={metricLogs}
            todaysLogs={todaysLogs}
            session={session}
        ></UserInterface>
    )
}
