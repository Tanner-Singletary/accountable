import { Button, View } from 'react-native';
import Home from './pages/Home';
import AddMetrics from './pages/AddMetrics';
import DeleteMetrics from './pages/DeleteMetrics';

export default function UserInterface(props) {
    let pageDisplay = <></>;
    props.metrics.forEach((item)=>{
        item.staged_to_delete = false;
        item.lifetimeCount = props.metricLogs.filter((log) => log.metric_id === item.id).length;
        item.todayCount = props.todayLogs.filter((log) => log.metric_id === item.id).length;
    });
    switch (props.activePage) {
        case "home":
            pageDisplay = (
                <Home
                    lifetimeScore={props.lifetimeScore} 
                    todayScore={props.todayScore} 
                    updateScore={props.updateScore}
                    metrics={props.metrics}
                    session={props.session}
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
                    metrics={props.metrics}
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
