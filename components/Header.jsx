import { Text } from 'react-native';
import { STYLES } from '../lib/styles/styles';

export default function Header () {
    return (
        <>
            <Text style={STYLES.header}>
                Accountable
                {"\n"}
            </Text>
            <Text style={{fontSize: 14}}>
                The actions you take create the person you're becoming.
                {"\n"}
            </Text>
        </>
    );
}
