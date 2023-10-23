import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { supabase } from '../lib/supabase';
import UserInterface from './UserInterface';

export default function Main(props) {
    const [todayScore, setTodayScore] = useState(0);
    const [activePage, setActivePage] = useState("home");
    const [loading, setLoading] = useState(false);
    const [positiveMetricsArr, setPositiveMetricsArr] = useState([]);
    const [negativeMetricsArr, setNegativeMetricsArr] = useState([]);
    // console.log(`session from App.js: ${props.session}`);


    useEffect(() => {
        getMetrics()
        /* activePage as dependency allows for refresh to display newly added metrics
        when navigating back to the home page, with the drawback that it unnecessarily
        does a GET call when changing to other pages (i.e. add metrics). Adding the
        metrics arrays was attempted but resulted in infinite loop. 
        */
      }, [activePage]);

    function updateTodayScore (increment) {
        setTodayScore(todayScore + increment);
    }

    async function getMetrics() {
        try {
          setLoading(true)
          const { data, error, status } = await supabase
            .from('metrics')
            .select(`name,category`)
            .eq('user', 'some_user')
            // .single()
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            let startingPositiveArr = [];
            let startingNegativeArr = [];
            console.log("data returned:");
            for (let row of data) {
                if (row.category === "positive") {
                    startingPositiveArr.push({"metric": row.name});
                } else if (row.category === "negative") {
                    startingNegativeArr.push({"metric": row.name});
                } else {
                    console.log(`row.category was not positive or negative, it was: ${row.category}`);
                }
                console.log(row);
            }
            setPositiveMetricsArr(startingPositiveArr);
            setNegativeMetricsArr(startingNegativeArr);
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        } finally {
          setLoading(false);
        }
      }

    return (
        loading ? <Text>Loading...</Text> :
        <UserInterface
            todayScore={todayScore}
            updateTodayScore={updateTodayScore}
            activePage={activePage}
            setActivePage={setActivePage}
            positiveMetricsArr={positiveMetricsArr}
            negativeMetricsArr={negativeMetricsArr}
        ></UserInterface>
    )
}
