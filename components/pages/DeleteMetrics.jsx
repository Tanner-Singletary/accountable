import { View, Switch, Text, FlatList } from 'react-native';
import { useState } from 'react';
// import { supabase } from '../../lib/supabase';

export default function DeleteMetrics({session}) {

// const { error } = await supabase
//   .from('countries')
//   .delete()
//   .eq('id', 1)


const [switchState, setSwitchState] = useState([
    {"metric": "met1", "staged_to_delete": false},
    {"metric": "metr2", "staged_to_delete": false}
]);
const toggleSwitch = (item) => {
    console.log("toggleSwitch triggered");
    let prevState = [ ...switchState];
    for (let obj of prevState) {
        if (obj.metric === item.metric) {
            console.log(`Changing ${obj.metric} from ${obj.staged_to_delete}to ${!obj.staged_to_delete}`);
            obj.staged_to_delete = !obj.staged_to_delete;
        }
    }
    console.log(prevState);
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
                  <Text>{item.metric}</Text>
                </View>
            }
            />
      
    </View>
  );
}