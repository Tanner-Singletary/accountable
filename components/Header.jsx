import { Text } from 'react-native';
import { theme } from '../lib/constants/theme';

export default function Header () {
  return (
    <>
      <Text style={theme.textVariants.header}>
        Accountable
        {"\n"}
      </Text>
      <Text style={theme.textVariants.body}>
        The actions you take create the person you're becoming.
        {"\n"}
      </Text>
    </>
  );
}
