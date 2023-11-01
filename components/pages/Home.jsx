import { View, Text, StyleSheet } from 'react-native';
import MetricButtonPanel from '../MetricButtonPanel';
import { theme } from '../../lib/constants/theme';

export default function Home(props) {
  return (
    <View style={styles.container}>
      {props.metrics.length > 0 ? 
        <View style={styles.buttonPanels}>
          <MetricButtonPanel 
            initialColorHex={theme.colors.good}
            colorHex={theme.colors.veryGood}
            metrics={props.metrics.filter((item) => item.category==="positive")}
            session={props.session}
          ></MetricButtonPanel>
          <MetricButtonPanel 
            initialColorHex={theme.colors.bad}
            colorHex={theme.colors.veryBad}
            metrics={props.metrics.filter((item) => item.category==="negative")}
            session={props.session}
          ></MetricButtonPanel>
        </View>
        : <Text style={{fontSize: 20}}>Click 'Add' below to get started! </Text>
      }
      <Text>{"\n"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: theme.spacing.s, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonPanels: {
    flex: 1, 
    flexDirection: 'row', 
    padding: theme.spacing.s, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});