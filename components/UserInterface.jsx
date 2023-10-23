import { View, Button } from 'react-native';
import Home from './pages/Home';
import AddMetrics from './pages/AddMetrics';

export default function UserInterface(props) {
    let pageDisplay = <></>;
    switch (props.activePage) {
        case "home":
            pageDisplay = (
                <Home
                    todayScore={props.todayScore} 
                    updateTodayScore={props.updateTodayScore}
                    positiveMetricsArr={props.positiveMetricsArr}
                    negativeMetricsArr={props.negativeMetricsArr}
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
    }
    
    return (
        <View style={{flex: 5, alignItems: 'center'}}>
            {pageDisplay}
            <Button
                title="Home"
                onPress={() => props.setActivePage("home")}
            ></Button>
            <Button
                title="Add Metrics"
                onPress={() => props.setActivePage("add_metrics")}
            ></Button>
        </View>
        );
}
