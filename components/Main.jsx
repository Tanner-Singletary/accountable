import UserInterface from './UserInterface';
import { useState } from 'react';

export default function Main() {
    const [todayScore, setTodayScore] = useState(0);
    const [activePage, setActivePage] = useState("home");
    const [positiveMetricsArr, setpositiveMetricsArr] = useState([]);
    const [negativeMetricsArr, setnegativeMetricsArr] = useState([]);
    
    function updateTodayScore (increment) {
        setTodayScore(todayScore + increment);
    }

    function updateMetric (addOrDelete, positiveOrNegative, metric) {
        let replacementArr = positiveOrNegative === "positive" ? positiveMetricsArr : negativeMetricsArr;
        if (addOrDelete === "add") {
            replacementArr.push({"metric": metric});
        } else if (addOrDelete === "delete") {
            replacementArr = replacementArr.filter(
                item => item.metric !== metric
            );
        }
        if (positiveOrNegative === "positive") {
            setpositiveMetricsArr(replacementArr);
        }
        else if (positiveOrNegative === "negative") {
            setnegativeMetricsArr(replacementArr);
        }
    }

    return (
        <UserInterface 
            todayScore={todayScore}
            updateTodayScore={updateTodayScore}
            activePage={activePage}
            setActivePage={setActivePage}
            positiveMetricsArr={positiveMetricsArr}
            negativeMetricsArr={negativeMetricsArr}
            updateMetric={updateMetric}
        ></UserInterface>
    )
}
