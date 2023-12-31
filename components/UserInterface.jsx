import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddMetrics from './pages/AddMetrics';
import DeleteMetrics from './pages/DeleteMetrics';

const Tab = createBottomTabNavigator();

export default function UserInterface(props) {
  props.metrics.forEach((item)=>{
    item.staged_to_delete = false;
    item.lifetimeCount = props.metricLogs.filter((log) => log.metric_id === item.id).length;
    item.todayCount = props.todayLogs.filter((log) => log.metric_id === item.id).length;
  });

  function HomePage () {
    return <Home
      metrics={props.metrics}
      session={props.session}
      triggerMetricCallToggle={props.triggerMetricCallToggle}
    ></Home>;
  }

  function ProfilePage () {
    return <Profile
      lifetimeScore={props.lifetimeScore} 
      todayScore={props.todayScore}
      triggerMetricCallToggle={props.triggerMetricCallToggle}
    ></Profile>;
  }
    
  function AddMetricsPage () {
    return <AddMetrics
      session={props.session}
      triggerMetricCallToggle={props.triggerMetricCallToggle}
    ></AddMetrics>;
  }

  function DeleteMetricsPage () {
    return <DeleteMetrics
      session={props.session}
      metrics={props.metrics}
      triggerMetricCallToggle={props.triggerMetricCallToggle}
    ></DeleteMetrics>;
  }
    
  return (
    <View style={styles.container}>
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
            name="Profile"
            component={ProfilePage}
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="head-flash-outline" color={color} size={size} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '100vw',
    justifyContent: 'center'
  }
});