import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '../lib/constants/theme';
import MetricButton from './MetricButton';

export default function MetricButtonPanel(props) {
  const textHeader = props.colorHex === theme.colors.veryBad ? "Don't": "Do";
  return (
    <View style={styles.container}>
      <Text style={theme.textVariants.subHeader}>{textHeader}</Text>
      <FlatList
        style={{backgroundColor: props.initialColorHex}}
        data={props.metrics}
        renderItem={
          ({item}) => <MetricButton
              metric={item}
              initialColorHex={props.initialColorHex}
              colorHex={props.colorHex}
              session={props.session}
          ></MetricButton>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    overflowY: 'auto', 
    maxHeight: '100%'
  }
});