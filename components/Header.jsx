import { Text } from 'react-native';
import { STYLES } from '../lib/styles/styles';

export default function Header () {
    return (
        <>
            <Text style={STYLES.title}>
                Accountable
                {"\n"}
                {"\n"}
            </Text>
            <Text style={{fontSize: 18}}>
                The actions you take create the person you're becoming.
                {"\n"}
                {"\n"}
            </Text>
        </>
    );
}
