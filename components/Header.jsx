import { Text } from 'react-native';

export default function Header () {
    return (
        <>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
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
