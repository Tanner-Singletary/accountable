import { View } from 'react-native';
import Home from './pages/Home';
import AddMetrics from './pages/AddMetrics';
import DeleteMetrics from './pages/DeleteMetrics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function UserInterface(props) {
    props.metrics.forEach((item)=>{
        item.staged_to_delete = false;
        item.lifetimeCount = props.metricLogs.filter((log) => log.metric_id === item.id).length;
        item.todayCount = props.todayLogs.filter((log) => log.metric_id === item.id).length;
    });

    function HomePage () {
        return <Home
            lifetimeScore={props.lifetimeScore} 
            todayScore={props.todayScore} 
            updateScore={props.updateScore}
            metrics={props.metrics}
            session={props.session}
        ></Home>
    }

    function AddMetricsPage () {
        return <AddMetrics
            session={props.session}
        ></AddMetrics>
    }

    function DeleteMetricsPage () {
        return <DeleteMetrics
            session={props.session}
            metrics={props.metrics}
            setActivePage={props.setActivePage}
        ></DeleteMetrics>
    }
    
    return (
        <View style={{flex: 1, minWidth: 400, justifyContent: 'center'}}>
            <Tab.Navigator
                initialRouteName="HomePage"
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63'

                }}
                >
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={AddMetricsPage}
                    options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} />
                    ),
                    tabBarBadge: 3,
                    }}
                />
                <Tab.Screen
                    name="Delete"
                    component={DeleteMetricsPage}
                    options={{
                    tabBarLabel: 'Delete',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="trash-can-outline" color={color} size={size} />
                    ),
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}