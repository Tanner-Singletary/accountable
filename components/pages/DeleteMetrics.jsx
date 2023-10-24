import { View, Switch, Text, FlatList } from 'react-native';
import { useState } from 'react';
// import { supabase } from '../../lib/supabase';

export default function DeleteMetrics(props) {

// const { error } = await supabase
//   .from('countries')
//   .delete()
//   .eq('id', 1)
const [switchState, setSwitchState] = useState(props.metrics);
const toggleSwitch = (item) => {
    let prevState = [ ...switchState];
    for (let obj of prevState) {
        if (obj.name === item.name) {
            obj.staged_to_delete = !obj.staged_to_delete;
        }
    }
    setSwitchState(prevState);
}

  return (
    <View>
         <Text style={{fontSize: 18, fontWeight: "bold"}}>Delete Metrics</Text>
            <FlatList
                data={switchState}
                renderItem={
                    ({item}) => 
                <View style={{flexDirection: 'row'}}>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={item.a ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch(item)}
                    value={item.staged_to_delete}
                  />
                  <Text>{item.name}</Text>
                </View>
            }
            />
      
    </View>
  );
}