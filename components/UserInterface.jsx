import { Button, View } from 'react-native';
import Home from './pages/Home';
import AddMetrics from './pages/AddMetrics';
import DeleteMetrics from './pages/DeleteMetrics';

export default function UserInterface(props) {
    let pageDisplay = <></>;
    let metricsWithDeleteToggle = props.metrics;
    metricsWithDeleteToggle.forEach((item)=>item["staged_to_delete"] = false);
    switch (props.activePage) {
        case "home":
            pageDisplay = (
                <Home
                    todayScore={props.todayScore} 
                    updateTodayScore={props.updateTodayScore}
                    metrics={props.metrics}
                ></Home>
            );
            break;
        case "add_metrics":
            pageDisplay = (
                <AddMetrics
                    session={props.session}
                ></AddMetrics>
            );
            break;
        case "delete_metrics":
            pageDisplay = (
                <DeleteMetrics
                    session={props.session}
                    metrics={metricsWithDeleteToggle}
                    setActivePage={props.setActivePage}
                ></DeleteMetrics>
            );
            break;
    }
    
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {pageDisplay}
            <Button
                title="Home"
                onPress={() => props.setActivePage("home")}
            ></Button>
            <Button
                title="Add Metrics"
                onPress={() => props.setActivePage("add_metrics")}
            ></Button>
            <Button
                title="Delete Metrics"
                onPress={() => props.setActivePage("delete_metrics")}
            ></Button>
        </View>
        );
}
